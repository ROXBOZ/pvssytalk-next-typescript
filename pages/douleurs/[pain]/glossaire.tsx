import React from "react";
import { GlossaryDetail, PainDetail, GlossaryDetails } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../../utils/sanity/client";
import { PortableText } from "@portabletext/react";
import PainNav from "../../../components/painNav";

const painGlossary = ({
  glossary,
  pain,
}: {
  pain: PainDetail;
  glossary: GlossaryDetails;
}) => {
  const sortedGlossary = glossary.sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Glossaire{" "}
            <a href="./" className="colored logo">
              {pain.name}
            </a>
          </h1>
          <PainNav pain={pain} />
        </div>
        <div>
          {sortedGlossary.map((term: GlossaryDetail) => {
            const matchedRelatedPain = term.relatedPain?.some(
              (related) => related._ref === pain._id
            );
            if (matchedRelatedPain) {
              return (
                <div key={term._id}>
                  <h2 className="h3">{term.term}</h2>
                  <PortableText value={term.def as any} />
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

export default painGlossary;

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
    const fetchedGlossary: GlossaryDetails | null = await client.fetch(
      `*[_type == "glossary"]`
    );

    if (!fetchedPain || !fetchedGlossary) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, glossary: fetchedGlossary },
    };
  } catch (error) {
    console.error("Error fetching glossary:", error);
    return {
      props: { pain: null, glossary: [] },
    };
  }
};
