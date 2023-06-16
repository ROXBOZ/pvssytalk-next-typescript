import React, { useRef, useState } from "react";
import { GlossaryDetail, PainDetail, Schema } from "../../../types";
import { client, urlFor } from "../../../utils/sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import PainNav from "../../../components/painNav";

const articlePain = ({ pain }: { pain: PainDetail }) => {
  const imgHotspot = pain.mainImage.hotspot;
  const imageCoverHotspot = {
    objectPosition: `${imgHotspot?.x * 100}% ${imgHotspot?.y * 100}%`,
  };
  const [isMed, setIsMed] = useState<boolean>(true);

  return (
    <main>
      <h1>{pain.name}</h1>

      {pain.mainImage && (
        <>
          <Image
            className="pain-illu-cover"
            src={urlFor(pain.mainImage.asset._ref).url()}
            width={2000}
            height={400}
            alt={pain.name}
            style={imageCoverHotspot}
          />
          <span style={{ float: "right" }} className="smaller-text">
            <em>
              Illustration : <span className="colored">Noémie Creux</span>
            </em>
          </span>
        </>
      )}

      <div className="pain-nav-article-container">
        <PainNav pain={pain} isMed={isMed} setIsMed={setIsMed} />

        <div className="pain-article">
          {isMed ? (
            <>
              {pain.medicalApproach?.def && (
                <>
                  <h2>Définition</h2>
                  <PortableText value={pain.medicalApproach.def as any} />
                </>
              )}
              {pain.medicalApproach?.schemas && (
                <>
                  <h3>En images</h3>
                  <div className="schemas-container">
                    {Object.keys(pain.medicalApproach.schemas).map(
                      (key: string, index: number) => {
                        const schema: Schema = pain.medicalApproach.schemas[
                          key
                        ] as Schema;

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
                  <PortableText value={pain.medicalApproach.diag as any} />
                </>
              )}
              {pain.medicalApproach?.sympt && (
                <>
                  <h2>Symptômes</h2>
                  <PortableText value={pain.medicalApproach.sympt as any} />
                </>
              )}
              {pain.medicalApproach?.why && (
                <>
                  <h2>Pourquoi ça m’arrive ?</h2>
                  <PortableText value={pain.medicalApproach.why as any} />
                </>
              )}
              {pain.medicalApproach?.auto && (
                <>
                  <h2>Que puis-je faire solo ?</h2>
                  <PortableText value={pain.medicalApproach.auto as any} />
                </>
              )}
              {pain.medicalApproach?.pros && (
                <>
                  <h2>Qui consulter ?</h2>
                  <PortableText value={pain.medicalApproach.pros as any} />
                </>
              )}
            </>
          ) : (
            <>
              {pain.sexologicApproach && <h2>Vivre avec la douleur</h2>}

              {pain.sexologicApproach?.body && (
                <>
                  <h3>Moi et mon corps</h3>
                  <PortableText value={pain.sexologicApproach.body as any} />
                </>
              )}
              {pain.sexologicApproach?.norms && (
                <>
                  <h3>Normes genrées</h3>
                  <PortableText value={pain.sexologicApproach.norms as any} />
                </>
              )}
              {pain.sexologicApproach?.everydayLife && (
                <>
                  <h3>Vie quotidienne</h3>
                  <PortableText
                    value={pain.sexologicApproach.everydayLife as any}
                  />
                </>
              )}

              {pain.sexologicApproach && <h2>Sexualité</h2>}

              {pain.sexologicApproach?.libido && (
                <>
                  <h3>Libido</h3>
                  <PortableText value={pain.sexologicApproach.libido as any} />
                </>
              )}
              {pain.sexologicApproach?.charge && (
                <>
                  <h3>Charge mentale et communication</h3>
                  <PortableText value={pain.sexologicApproach.charge as any} />
                </>
              )}
              {pain.sexologicApproach?.consent && (
                <>
                  <h3>Sexe et consentement</h3>
                  <PortableText value={pain.sexologicApproach.consent as any} />
                </>
              )}
              {pain.sexologicApproach?.mental && (
                <>
                  <h2>Santé mentale</h2>
                  <PortableText value={pain.sexologicApproach.mental as any} />
                </>
              )}
              {pain.sexologicApproach?.parenthood && (
                <>
                  <h2>Parentalité</h2>
                  <PortableText
                    value={pain.sexologicApproach.parenthood as any}
                  />
                </>
              )}
              {pain.sexologicApproach?.checkup && (
                <>
                  <h2>Avec les pros de la santé</h2>
                  <PortableText value={pain.sexologicApproach.checkup as any} />
                </>
              )}
              {pain.sexologicApproach?.treatments && (
                <>
                  <h3>Quels traitements pour me soulager ?</h3>
                  <PortableText
                    value={pain.sexologicApproach.treatments as any}
                  />
                </>
              )}
              {pain.sexologicApproach?.pleasure && (
                <>
                  <h2>Plaisir/ anti-douleur</h2>
                  <PortableText
                    value={pain.sexologicApproach.pleasure as any}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default articlePain;

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
    const fetchedGlossary: GlossaryDetail | null = await client.fetch(
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
      props: { pain: null },
    };
  }
};
