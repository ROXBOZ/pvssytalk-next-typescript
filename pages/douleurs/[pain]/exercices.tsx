import React from "react";
import { PainDetail, ExerciseDetail, ExerciseDetails } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import PainNav from "../../../components/painNav";
import {
  getStaticPathsPain,
  getStaticPropsPainExercises,
} from "../../../props/dataFetching";
import { Exercise } from "../../../components/exercise";

const PainExercises = ({
  exercises,
  pain,
}: {
  pain: PainDetail;
  exercises: ExerciseDetails;
}) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Exercices{" "}
            <a href="./" className="colored logo">
              {pain.name}
            </a>{" "}
            <sup className="no-color">?</sup>
          </h1>
          <PainNav pain={pain} />
        </div>
        <div className="exercises-container">
          {exercises &&
            Array.isArray(exercises) &&
            exercises.map((exercise: ExerciseDetail) => {
              const matchedRelatedPain = exercise.relatedPain?.some(
                (related) => related._ref === pain._id
              );
              if (matchedRelatedPain) {
                return <Exercise exercise={exercise} />;
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default PainExercises;
export const getStaticProps: GetStaticProps = getStaticPropsPainExercises;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
