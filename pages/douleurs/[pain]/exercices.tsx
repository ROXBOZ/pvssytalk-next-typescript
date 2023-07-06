import React from "react";
import { PainDetail, ExerciseDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import PainNav from "../../../components/painNav";
import {
  getStaticPathsPain,
  getStaticPropsPainExercises,
} from "../../../utils/dataFetching";
import { Exercise } from "../../../components/exercise";

const PainExercises = ({
  exercises,
  pain,
}: {
  pain: PainDetail;
  exercises: ExerciseDetail;
}) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Exercices{" "}
            <a href="./" className="colored logo">
              {pain.name}
            </a>
             <sup className="no-color">{exercises.length}</sup>
          </h1>
          <PainNav pain={pain} />
        </div>
        <div className="exercises-container">
          {exercises &&
            exercises.map((exercise: ExerciseDetail) => {
              return <Exercise exercise={exercise} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default PainExercises;
export const getStaticProps: GetStaticProps = getStaticPropsPainExercises;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
