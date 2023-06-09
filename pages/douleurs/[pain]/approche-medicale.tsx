import React, { useRef, useState } from "react";
import { PainDetail } from "../../../types";
import { client, urlFor } from "../../../utils/sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import PainNav from "../../../components/painNav";
import { Link } from "react-router-dom";

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
  const [isMed, setIsMed] = useState<boolean>(true);

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
        <PainNav pain={pain} isMed={isMed} setIsMed={setIsMed} />

        <div className="pain-article">
          {isMed ? (
            <>
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
                        const schema = pain.medicalApproach.schemas[
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
              {pain.medicalApproach?.auto && (
                <>
                  <h2>Que puis-je faire solo ?</h2>
                  <PortableText value={pain.medicalApproach.auto} />
                </>
              )}
              {pain.medicalApproach?.pros && (
                <>
                  <h2>Qui consulter ?</h2>
                  <PortableText value={pain.medicalApproach.pros} />
                </>
              )}
            </>
          ) : (
            <>
              <h2>Vivre avec la douleur</h2>
              {pain.sexologicApproach?.body && (
                <>
                  <h3>Moi et mon corps</h3>
                  <PortableText value={pain.sexologicApproach.body} />
                </>
              )}
              {pain.sexologicApproach?.norms && (
                <>
                  <h3>Normes genrées</h3>
                  <PortableText value={pain.sexologicApproach.norms} />
                </>
              )}
              {pain.sexologicApproach?.everydayLife && (
                <>
                  <h3>Vie quotidienne</h3>
                  <PortableText value={pain.sexologicApproach.everydayLife} />
                </>
              )}
              <h2>Sexualité avec la douleur</h2>
              {pain.sexologicApproach?.libido && (
                <>
                  <h3>Libido</h3>
                  <PortableText value={pain.sexologicApproach.libido} />
                </>
              )}
              {pain.sexologicApproach?.charge && (
                <>
                  <h3>Charge mentale et communication</h3>
                  <PortableText value={pain.sexologicApproach.charge} />
                </>
              )}
              {pain.sexologicApproach?.consent && (
                <>
                  <h3>Sexe et consentement</h3>
                  <PortableText value={pain.sexologicApproach.consent} />
                </>
              )}
              {pain.sexologicApproach?.mental && (
                <>
                  <h2>Santé mentale</h2>
                  <PortableText value={pain.sexologicApproach.mental} />
                </>
              )}
              {pain.sexologicApproach?.parenthood && (
                <>
                  <h2>Parentalité</h2>
                  <PortableText value={pain.sexologicApproach.parenthood} />
                </>
              )}
              {pain.sexologicApproach?.checkup && (
                <>
                  <h2>Avec les pros de la santé</h2>
                  <PortableText value={pain.sexologicApproach.checkup} />
                </>
              )}
              {pain.sexologicApproach?.treatments && (
                <>
                  <h2>Quels traitements pour me soulager ?</h2>
                  <PortableText value={pain.sexologicApproach.treatments} />
                </>
              )}
              {pain.sexologicApproach?.pleasure && (
                <>
                  <h2>Plaisir/ anti-douleur</h2>
                  <PortableText value={pain.sexologicApproach.pleasure} />
                </>
              )}
            </>
          )}
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
