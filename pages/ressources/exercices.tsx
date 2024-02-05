import {
  ExerciseDetail,
  ExerciseDetails,
  MenuDetail,
  PainDetail,
} from "../../types";
import Filters, { pains } from "../../components/reusables/Filters";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Breadcrumbs from "../../components/Breadcrumbs";
import { Exercise } from "../../components/exercise";
import Layout from "../../components/Layout";
import ResourcePageLayout from "../../components/layouts/ResourcePageLayout";
import RessourceNav from "../../components/ressourceNav";
import { client } from "../../config/sanity/client";

const Exercises = ({
  exercises,
  headerMenu,
  footerMenu,
}: {
  exercises: ExerciseDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
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

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <ResourcePageLayout pageName="Exercices" relatedContent={exercises}>
        <div className="exercises-container">
          {filteredExercises &&
            filteredExercises.map((exercise: ExerciseDetail) => {
              return <Exercise exercise={exercise} />;
            })}
        </div>
      </ResourcePageLayout>
    </Layout>
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
    return {
      props: { exercises, pains, headerMenu, footerMenu },
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return {
      props: { exercises: [], pains: [] },
    };
  }
};
