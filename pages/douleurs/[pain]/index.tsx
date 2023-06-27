import React, { useState } from "react";
import { GlossaryDetails, PainDetail, Schema } from "../../../types";
import { urlFor } from "../../../utils/sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import PainDashboard from "../../../components/painDashboard";
import {
  getStaticPathsPain,
  getStaticPropsPainGlossary,
} from "../../../props/dataFetching";
import { websiteURL } from "../../../utils/urls";
import { regexTerm } from "../../../utils/regex";

const articlePain = ({
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

  const painTerms = glossary.map((term) => {
    return term.term;
  });

  const painTermRedirect = (painTerm: string) => {
    return `${websiteURL}/douleurs/${pain.slug.current}/glossaire/#${regexTerm(
      painTerm
    )}`;
  };

  const highlightText = (text: any) => {
    if (typeof text === "string") {
      if (painTerms.length === 0) {
        return (
          <span style={{ backgroundColor: "blue" }}>
            <PortableText value={text as any} />
          </span>
        );
      } else {
        const termsRegex = new RegExp(`\\b(${painTerms.join("|")})\\b`, "gi");
        const splitText = text.split(termsRegex);

        const highlightedText = splitText.map((part, index) => {
          const lowerCasePart = part.toLowerCase();
          if (
            painTerms.some((term) => lowerCasePart.includes(term.toLowerCase()))
          ) {
            return (
              <a
                style={{ backgroundColor: "yellow" }}
                key={index}
                href={painTermRedirect(part)}
                className="glossary-term"
              >
                {part}
              </a>
            );
          } else {
            return (
              <span style={{ color: "orange" }} key={index}>
                {part}
              </span>
            );
          }
        });
        return highlightedText;
      }
    } else {
      return (
        <span style={{ backgroundColor: "yellow" }}>
          !!!! <PortableText value={text as any} />
        </span>
      );
    }
  };

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

                  {highlightText("test: contraction musculaire yuhouioyuyo")}

                  {highlightText(pain.medicalApproach.def)}

                  {/* {console.log(
                    " <PortableText value={pain.medicalApproach.def as any} /> :",
                    <PortableText value={pain.medicalApproach.def as any} />
                  )} */}
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
                              alt={`schéma : ${schema.schemaImage.alternativeText}`}
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
                  <h2>Pourquoi ça m’arrive ?</h2>
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

export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
export const getStaticProps: GetStaticProps = getStaticPropsPainGlossary;
