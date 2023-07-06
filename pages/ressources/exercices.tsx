import React, { useState } from "react";
import RessourceNav from "../../components/ressourceNav";
import { ExerciseDetail } from "../../types";
import { Exercise } from "../../components/exercise";
import { getStaticPropsExercises } from "../../utils/dataFetching";
import { GetStaticProps } from "next";
import Filters, { pains } from "../../components/reusables/Filters";

const Exercises = ({ exercises }: { exercises: ExerciseDetail[] }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
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
