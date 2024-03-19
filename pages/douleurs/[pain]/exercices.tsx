import {
  ExerciseDetail,
  ExerciseDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import { Exercise } from "../../../components/Exercise";
import { GetStaticPaths } from "next";
import Layout from "../../../components/layouts/Layout";
import ResourcePageLayout from "../../../components/layouts/ResourcePageLayout";
import { client } from "../../../config/sanity/client";
import { getStaticPathsPain } from "../../../utils/dataFetching";

const filterRelatedExercises = (
  exercises: ExerciseDetail[],
  painId: string
): ExerciseDetail[] => {
  return exercises.filter((exercise: ExerciseDetail) =>
    exercise.relatedPain?.some((related) => related._ref === painId)
  );
};

const PainExercises = ({
  exercises,
  pain,
  headerMenu,
  footerMenu,
  painsSlugs,
  marquee,
}: {
  pain: PainDetail;
  exercises: ExerciseDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  painsSlugs: any;
  marquee: any;
}) => {
  const relatedExercises = filterRelatedExercises(exercises, pain._id);
  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const [openExerciseId, setOpenExerciseId] = useState(null);

  const handleExerciseToggle = (id: any) => {
    setOpenExerciseId(id === openExerciseId ? null : id);
  };

  return (
    <Layout
      painsSlugs={painsSlugs}
      headerMenu={headerMenu}
      footerMenu={footerMenu}
      marquee={marquee}
    >
      <ResourcePageLayout
        pageName="Exercices"
        pain={pain}
        relatedContent={relatedExercises}
        selectedPain={selectedPain}
        setSelectedPain={setSelectedPain}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      >
        <div className="exercises-container">
          {relatedExercises &&
            relatedExercises.map((exercise: ExerciseDetail) => (
              <Exercise
                exercise={exercise}
                key={exercise._id}
                isOpen={exercise._id === openExerciseId}
                onToggle={handleExerciseToggle}
              />
            ))}
        </div>
      </ResourcePageLayout>
    </Layout>
  );
};

export default PainExercises;

export const getStaticProps = async ({ params }: any) => {
  try {
    const { pain } = params!;
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedExercises: ExerciseDetails[] | null = await client.fetch(
      `*[_type == "exercise" && references($painId)]`,
      { painId: fetchedPain?._id }
    );
    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );

    const marquee: any = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))]{marquee}'
    );

    if (!fetchedPain || !fetchedExercises) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pain: fetchedPain,
        exercises: fetchedExercises,
        headerMenu,
        footerMenu,
        painsSlugs,
        marquee,
      },
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return {
      props: { pain: null, exercises: [] },
    };
  }
};
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
