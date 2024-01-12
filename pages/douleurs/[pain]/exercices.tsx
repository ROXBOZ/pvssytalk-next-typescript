import { ExerciseDetail, PainDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  getStaticPathsPain,
  getStaticPropsPainExercises,
} from "../../../utils/dataFetching";

import { Exercise } from "../../../components/exercise";
import PainResourcePageLayout from "../../../components/reusables/PainResourcePageLayout";
import React from "react";

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
}: {
  pain: PainDetail;
  exercises: ExerciseDetail[];
}) => {
  const relatedExercises = filterRelatedExercises(exercises, pain._id);
  return (
    <PainResourcePageLayout
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
    </PainResourcePageLayout>
  );
};

export default PainExercises;
export const getStaticProps: GetStaticProps = getStaticPropsPainExercises;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
