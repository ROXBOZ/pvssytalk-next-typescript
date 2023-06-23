import React from "react";
import RessourceNav from "../../components/ressourceNav";
import { ExerciseDetail } from "../../types";
import { Exercise } from "../../components/exercise";
import { getStaticPropsExercises } from "../../props/dataFetching";
import { GetStaticProps } from "next";

const Exercises = ({ exercises }: { exercises: ExerciseDetail[] }) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Exercices <sup>{exercises.length}</sup>
          </h1>
          <RessourceNav />
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
