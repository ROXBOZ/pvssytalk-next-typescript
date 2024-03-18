import React, { useEffect, useRef, useState } from "react";

import { ExerciseDetail } from "../types";
import { PortableText } from "@portabletext/react";

export const Exercise = ({
  exercise,
  isOpen,
  onToggle,
}: {
  exercise: ExerciseDetail;
  isOpen: boolean;
  onToggle: any;
}) => {
  const extractVideoId = (url: string) => {
    const lastSlashIndex = url.lastIndexOf("/");
    return url.substring(lastSlashIndex + 1);
  };

  const exerciseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && exerciseRef.current) {
      exerciseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  return (
    <div ref={exerciseRef} className="exercise">
      <>
        <h2 className="h3">
          {exercise.title}{" "}
          <button onClick={() => onToggle(exercise._id)}>
            {isOpen ? "–" : "+"}
          </button>
        </h2>
      </>
      {isOpen && (
        <>
          <div className="exercise-intro">
            <PortableText value={exercise.exerciseIntro as any} />
          </div>
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
                exercise.steps.map((step, index) => {
                  return (
                    <div className="step" key={step._key}>
                      <div className="">
                        <h4>
                          <li>{step.title}</li>
                        </h4>
                      </div>
                      <PortableText value={step.stepDescription as any} />
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
