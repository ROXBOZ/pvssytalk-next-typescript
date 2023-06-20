import React, { useState } from "react";
import { PainDetail, ExerciseDetail, ExerciseDetails } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../../utils/sanity/client";
import { PortableText } from "@portabletext/react";
import PainNav from "../../../components/painNav";

const PainExercises = ({
  exercises,
  pain,
}: {
  pain: PainDetail;
  exercises: ExerciseDetails;
}) => {
  const [openExerciseId, setOpenExerciseId] = useState(null);
  const [openStepId, setOpenStepId] = useState(null);

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
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Exercices{" "}
            <a href="./" className="colored logo">
              {pain.name}
            </a>
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
                const isExerciseOpen = openExerciseId === exercise._id;

                return (
                  <div className="exercise" key={exercise._id}>
                    <div className="exercice-closed">
                      <h2 className="h3">{exercise.title}</h2>
                      <div className="exercise-intro">
                        <PortableText value={exercise.exerciseIntro as any} />
                      </div>
                      <button
                        onClick={() => handleExerciseToggle(exercise._id)}
                      >
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
                                        onClick={() =>
                                          handleStepToggle(step._key)
                                        }
                                      >
                                        {isStepOpen ? "-" : "+"}
                                      </button>
                                    </div>
                                    {isStepOpen && (
                                      <PortableText
                                        value={step.stepDescription as any}
                                      />
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
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default PainExercises;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs: string[] = await client.fetch(
      `*[_type == "pain"].slug.current`
    );

    const paths = slugs.map((slug) => ({
      params: { pain: slug },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedExercises: ExerciseDetails | null = await client.fetch(
      `*[_type == "exercise"]`
    );

    if (!fetchedPain || !fetchedExercises) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, exercises: fetchedExercises },
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return {
      props: { pain: null, exercises: [] },
    };
  }
};
