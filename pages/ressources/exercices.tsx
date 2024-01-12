import Filters, { pains } from "../../components/reusables/Filters";
import React, { useState } from "react";

import { Exercise } from "../../components/exercise";
import { ExerciseDetail } from "../../types";
import { GetStaticProps } from "next";
import RessourceNav from "../../components/ressourceNav";
import { getStaticPropsExercises } from "../../utils/dataFetching";

const Exercises = ({ exercises }: { exercises: ExerciseDetail[] }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  return (
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
          {exercises.map((exercise: ExerciseDetail) => (
            <Exercise exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
export const getStaticProps: GetStaticProps = getStaticPropsExercises;
