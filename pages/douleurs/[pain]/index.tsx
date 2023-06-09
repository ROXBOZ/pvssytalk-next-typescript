import React from "react";
import { PainDetail } from "../../../types";
import { client } from "../../../utils/sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";

const Pain = ({ pain }: { pain: PainDetail }) => {
  const painSlug = pain.name.toLowerCase();

  return (
    <div>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>{pain.name}</h1>
          </div>
          <div>
            <nav className="nav-directory">
              <a href={`${painSlug}/approche-medicale`}>Approche médicale</a>
              <a href={`${painSlug}/approche-sexologique`}>
                Approche sexologique
              </a>
              <a href={`${painSlug}/glossaire`}>Glossaire</a>
              <a href={`${painSlug}/exercices`}>Exercices</a>
              <a href={`${painSlug}/medias`}>Littérature et médias</a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pain;

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

    if (!fetchedPain) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain },
    };
  } catch (error) {
    console.error("Error fetching pain:", error);
    return {
      props: { pain: null },
    };
  }
};
