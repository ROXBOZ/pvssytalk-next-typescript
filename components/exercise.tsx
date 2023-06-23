import React, { useState } from "react";
import { ExerciseDetail } from "../types";
import { PortableText } from "@portabletext/react";

export const Exercise = ({ exercise }: { exercise: ExerciseDetail }) => {
  const [openExerciseId, setOpenExerciseId] = useState(null);
  const [openStepId, setOpenStepId] = useState(null);
  const isExerciseOpen = openExerciseId === exercise._id;
  const handleExerciseToggle = (id: any) => {
    setOpenExerciseId((prevId) => (prevId === id ? null : id));
    setOpenStepId(null);
  };
  const handleStepToggle = (id: any) => {
    setOpenStepId((prevId) => (prevId === id ? null : id));
  };
  const extractVideoId = (url: string) => {
    const lastSlashIndex = url.lastIndexOf("/");
    return url.substring(lastSlashIndex + 1);
  };

  return (
    <div className="exercise" key={exercise._id}>
      <div className="exercice-closed">
        <h2 className="h3">{exercise.title}</h2>
        <div className="exercise-intro">
          <PortableText value={exercise.exerciseIntro as any} />
        </div>
        <button onClick={() => handleExerciseToggle(exercise._id)}>
          {isExerciseOpen ? "fermer" : "en savoir +"}
        </button>
      </div>
      {isExerciseOpen && (
        <>
          <div className="exercise-steps">
            {exercise.video && (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${extractVideoId(
                  exercise.video
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            )}
            <ol>
              {exercise.steps &&
                Array.isArray(exercise.steps) &&
                exercise.steps.map((step) => {
                  const isStepOpen = openStepId === step._key;

                  return (
                    <div className="step" key={step._key}>
                      <div className="step-closed">
                        <h4>
                          <li>{step.title}</li>
                        </h4>

                        <button
                          className="square-button"
                          onClick={() => handleStepToggle(step._key)}
                        >
                          {isStepOpen ? "-" : "+"}
                        </button>
                      </div>
                      {isStepOpen && (
                        <PortableText value={step.stepDescription as any} />
                      )}
                    </div>
                  );
                })}
            </ol>
          </div>
        </>
      )}
    </div>
  );
};
