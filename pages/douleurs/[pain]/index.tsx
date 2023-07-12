import React, { useState } from "react";
import { Diagram, GlossaryDetails, PainDetail } from "../../../types";
import { urlFor } from "../../../config/sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import PainDashboard from "../../../components/painDashboard";
import {
  getStaticPathsPain,
  getStaticPropsPainGlossary,
} from "../../../utils/dataFetching";
import Link from "next/link";

const ArticlePain = ({
  pain,
  glossary,
}: {
  pain: PainDetail;
  glossary: GlossaryDetails;
}) => {
  const [isMed, setIsMed] = useState<boolean>(true);
  const imgHotspot = pain.mainImage.hotspot;
  const imageCoverHotspot = {
    objectPosition: `${imgHotspot?.x * 100}% ${imgHotspot?.y * 100}%`,
  };

  const CustomPortableText = ({
    value,
    slug,
    glossary,
  }: {
    value: any;
    slug: string;
    glossary: GlossaryDetails;
  }) => (
    <PortableText
      value={value}
      components={{
        marks: {
          internalLink: ({ value, children }) => {
            const foo = glossary.find(
              (term) => term._id === value.reference._ref
            );
            const href = foo?.slug?.current ?? "";
            return <Link href={`${slug}/glossaire/#${href}`}>{children}</Link>;
          },
        },
      }}
    />
  );

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
            priority
          />
          <span style={{ float: "right" }} className="smaller-text">
            <em>
              Illustration : <span className="colored">Noémie Creux</span>
            </em>
          </span>
        </>
      )}

      <div className="pain-nav-article-container">
        <PainDashboard pain={pain} isMed={isMed} setIsMed={setIsMed} />
        <div className="pain-article">
          {isMed ? (
            <>
              {pain.medicalApproach?.def && (
                <>
                  <h2>Définition</h2>
                  <CustomPortableText
                    value={pain.medicalApproach?.def}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.medicalApproach?.diagrams && (
                <>
                  <h3>En images</h3>
                  <div className="schemas-container">
                    {Array.isArray(pain.medicalApproach.diagrams) &&
                      pain.medicalApproach.diagrams.map(
                        (diagram: Diagram, index: number) => {
                          return (
                            <div key={index}>
                              <Image
                                className="schema"
                                src={urlFor(diagram.diagram.asset._ref).url()}
                                width={2000}
                                height={400}
                                alt={`schéma : ${diagram.diagram.alternativeText}`}
                              />
                              <p className="schema-caption">
                                {diagram.diagram.caption}
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
                  <CustomPortableText
                    value={pain.medicalApproach?.diag}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.medicalApproach?.sympt && (
                <>
                  <h2>Symptômes</h2>
                  <CustomPortableText
                    value={pain.medicalApproach?.sympt}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.medicalApproach?.why && (
                <>
                  <h2>Pourquoi ça m’arrive ?</h2>
                  <CustomPortableText
                    value={pain.medicalApproach?.why}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.medicalApproach?.auto && (
                <>
                  <h2>Que puis-je faire solo ?</h2>
                  <CustomPortableText
                    value={pain.medicalApproach?.auto}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.medicalApproach?.pros && (
                <>
                  <h2>Qui consulter ?</h2>
                  <CustomPortableText
                    value={pain.medicalApproach?.pros}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {pain.sexologicApproach && <h2>Vivre avec la douleur</h2>}

              {pain.sexologicApproach?.body && (
                <>
                  <h3>Moi et mon corps</h3>
                  <CustomPortableText
                    value={pain.sexologicApproach?.body}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.norms && (
                <>
                  <h3>Normes genrées</h3>
                  <CustomPortableText
                    value={pain.sexologicApproach?.norms}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.everydayLife && (
                <>
                  <h3>Vie quotidienne</h3>
                  <CustomPortableText
                    value={pain.sexologicApproach?.everydayLife}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}

              {pain.sexologicApproach && <h2>Sexualité</h2>}

              {pain.sexologicApproach?.libido && (
                <>
                  <h3>Libido</h3>
                  <CustomPortableText
                    value={pain.sexologicApproach?.libido}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.charge && (
                <>
                  <h3>Charge mentale et communication</h3>
                  <CustomPortableText
                    value={pain.sexologicApproach?.charge}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.consent && (
                <>
                  <h3>Sexe et consentement</h3>
                  <CustomPortableText
                    value={pain.sexologicApproach?.consent}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.mental && (
                <>
                  <h2>Santé mentale</h2>
                  <CustomPortableText
                    value={pain.sexologicApproach?.mental}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.parenthood && (
                <>
                  <h2>Parentalité</h2>
                  <CustomPortableText
                    value={pain.sexologicApproach?.parenthood}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.checkup && (
                <>
                  <h2>Avec les pros de la santé</h2>
                  <CustomPortableText
                    value={pain.sexologicApproach?.checkup}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.treatments && (
                <>
                  <h3>Quels traitements pour me soulager ?</h3>
                  <CustomPortableText
                    value={pain.sexologicApproach?.treatments}
                    slug={pain.slug.current}
                    glossary={glossary}
                  />
                </>
              )}
              {pain.sexologicApproach?.pleasure && (
                <>
                  <h2>Plaisir/ anti-douleur</h2>
                  <CustomPortableText
                    value={pain.sexologicApproach?.pleasure}
                    slug={pain.slug.current}
                    glossary={glossary}
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

export default ArticlePain;

export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
export const getStaticProps: GetStaticProps = getStaticPropsPainGlossary;
