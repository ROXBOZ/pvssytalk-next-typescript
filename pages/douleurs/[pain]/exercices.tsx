import {
  ExerciseDetail,
  ExerciseDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { Exercise } from "../../../components/Exercise";
import { GetStaticPaths } from "next";
import Layout from "../../../components/layouts/Layout";
import React from "react";
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
}: {
  pain: PainDetail;
  exercises: ExerciseDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const relatedExercises = filterRelatedExercises(exercises, pain._id);
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <ResourcePageLayout
        pageName="Exercices"
        pain={pain}
        relatedContent={relatedExercises}
      >
        <div className="exercises-container">
          {relatedExercises &&
            relatedExercises.map((exercise: ExerciseDetail, index: number) => (
              <Exercise exercise={exercise} key={index} />
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
