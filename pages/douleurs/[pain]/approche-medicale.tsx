import React from "react";
import { PainDetail } from "../../../types";
import { client, urlFor } from "../../../utils/sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import PainNav from "../../../components/painNav";

interface Schema {
  schemaImage: {
    asset: {
      _ref: string;
    };
    alternativeText: string;
    caption: string;
  };
}

const approcheMedicale = ({ pain }: { pain: PainDetail }) => {
  const imgHotspot = pain.mainImage.hotspot;
  const imageCoverHotspot = {
    objectPosition: `${imgHotspot?.x * 100}% ${imgHotspot?.y * 100}%`,
  };

  return (
    <main>
      <h1>{pain.name}</h1>

      {pain.mainImage && (
        <Image
          className="pain-illu-cover"
          src={urlFor(pain.mainImage.asset._ref).url()}
          width={2000}
          height={400}
          alt={pain.name}
          style={imageCoverHotspot}
        />
      )}

      <div className="pain-nav-article-container">
        <PainNav pain={pain} />

        <div className="pain-article">
          {pain.medicalApproach?.def && (
            <>
              <h2>Définition</h2>
              <PortableText value={pain.medicalApproach.def} />
            </>
          )}

          {pain.medicalApproach?.schemas && (
            <>
              <h3>En images</h3>
              <div className="schemas-container">
                {Object.keys(pain.medicalApproach.schemas).map(
                  (key: string, index: number) => {
                    const schema = pain.medicalApproach.schemas[key] as Schema;
                    return (
                      <div key={index}>
                        <Image
                          className="schema"
                          src={urlFor(schema.schemaImage.asset._ref).url()}
                          width={2000}
                          height={400}
                          alt={schema.schemaImage.alternativeText}
                        />
                        <p className="schema-caption">
                          {schema.schemaImage.caption}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </>
          )}

          {pain.medicalApproach?.diag && (
            <>
              <h2>Diagnostic</h2>
              <PortableText value={pain.medicalApproach.diag} />
            </>
          )}
          {pain.medicalApproach?.sympt && (
            <>
              <h2>Symptômes</h2>
              <PortableText value={pain.medicalApproach.sympt} />
            </>
          )}
          {pain.medicalApproach?.why && (
            <>
              <h2>Pourquoi ça m’arrive ?</h2>
              <PortableText value={pain.medicalApproach.why} />
            </>
          )}
          <p style={{ color: "red" }}>... suite</p>
        </div>
      </div>
    </main>
  );
};

export default approcheMedicale;

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
