import {
  ExerciseDetail,
  ExerciseDetails,
  MenuDetail,
  PainDetail,
} from "../../types";
import Filters, { pains } from "../../components/reusables/Filters";
import React, { useState } from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
import { Exercise } from "../../components/exercise";
import Layout from "../../components/Layout";
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
  console.log("selectedFilter :", selectedFilter);

  const filteredExercises = exercises.filter((exercise) => {
    console.log("exercise :", exercise);
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
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div className="fixed-container">
            <h1>
              Exercices <sup>{exercises.length}</sup>
            </h1>
            <RessourceNav />
            <Filters
              filterOptions={pains}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
          <div className="exercises-container">
            {filteredExercises &&
              filteredExercises.map((exercise: ExerciseDetail) => {
                return <Exercise exercise={exercise} />;
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Exercises;
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const footerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
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
