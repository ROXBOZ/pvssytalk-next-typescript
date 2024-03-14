import {
  ExerciseDetail,
  ExerciseDetails,
  MenuDetail,
  PainDetail,
} from "../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import CustomHead from "../../components/CustomHead";
import { Exercise } from "../../components/Exercise";
import Layout from "../../components/layouts/Layout";
import ResourcePageLayout from "../../components/layouts/ResourcePageLayout";
import { client } from "../../config/sanity/client";

const Exercises = ({
  exercises,
  headerMenu,
  footerMenu,
  seo,
  painsSlugs,
}: {
  exercises: ExerciseDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  seo: any;
  painsSlugs: any;
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredExercises = exercises.filter((exercise) => {
    return (
      !selectedFilter ||
      (exercise.relatedPain &&
        exercise.relatedPain.some(
          (pain: any) =>
            pain.name.toLowerCase() === selectedFilter.toLowerCase()
        ))
    );
  });

  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <>
      <CustomHead seo={seo[0].exercices} />
      <Layout
        painsSlugs={painsSlugs}
        headerMenu={headerMenu}
        footerMenu={footerMenu}
      >
        <ResourcePageLayout
          pageName="Exercices"
          relatedContent={exercises}
          selectedPain={selectedPain}
          setSelectedPain={setSelectedPain}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        >
          <div className="exercises-container">
            {filteredExercises &&
              filteredExercises.map(
                (exercise: ExerciseDetail, index: number) => {
                  const itemPains: string[] = (exercise.relatedPain || []).map(
                    (p: any) => p.name
                  );

                  if (!selectedPain || itemPains.includes(selectedPain)) {
                    return <Exercise key={index} exercise={exercise} />;
                  }
                  return null;
                }
              )}
          </div>
        </ResourcePageLayout>
      </Layout>
    </>
  );
};

export default Exercises;
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const exercises: ExerciseDetails = await client.fetch(
      '*[_type == "exercise" && !(_id in path("drafts.**"))]{..., relatedPain[]->{name}}'
    );
    const pains: PainDetail = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );

    const seo: any = await client.fetch(
      '*[_type == "seoManager" && !(_id in path("drafts.**"))]'
    );
    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );

    return {
      props: { exercises, pains, headerMenu, footerMenu, seo, painsSlugs },
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return {
      props: { exercises: [], pains: [] },
    };
  }
};
