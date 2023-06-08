import React from "react";
import { PainDetail } from "../../../types";
import { client, urlFor } from "../../../utils/sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";

const medicalArticle = ({ pain }: { pain: PainDetail }) => {
  return (
    <main>
      <h1>{pain.name}</h1>
      <img
        className="pain-illu-cover"
        src={urlFor(pain.mainImage).url()}
        alt={pain.name}
      />
      <div className="article">
        {pain.medicalApproach.def && (
          <>
            <h2>Définition</h2>
            <p>{pain.medicalApproach.def[0].children[0].text}</p>
          </>
        )}
      </div>
    </main>
  );
};

export default medicalArticle;

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
