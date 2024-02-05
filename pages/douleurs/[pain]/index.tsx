import {
  Diagram,
  GlossaryDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { client, urlFor } from "../../../config/sanity/client";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { GetStaticPaths } from "next";
import Image from "next/image";
import Layout from "../../../components/layouts/Layout";
import Link from "next/link";
import Modal from "../../../components/Modal";
import PainDashboard from "../../../components/painDashboard";
import { PortableText } from "@portabletext/react";

const ArticlePain = ({ pain, glossary, headerMenu, footerMenu }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMed, setIsMed] = useState<boolean>(true);
  const imgHotspot = pain.mainImage.hotspot;
  const [showModal, setShowModal] = useState(false);
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const imageCoverHotspot = {
    objectPosition: `${imgHotspot?.x * 100}% ${imgHotspot?.y * 100}%`,
  };

  const renderDiagram = (diagram: Diagram, index: number) => (
    <div
      className="schema-container"
      onClick={() => handleImageModal(index)}
      data-index={index}
      key={index}
    >
      <Image
        className="schema"
        src={urlFor(diagram.diagram.asset._ref).url()}
        width={500}
        height={500}
        alt={`schéma : ${diagram.diagram.alternativeText}`}
      />
      <p className="schema-caption">{diagram.diagram.caption}</p>
    </div>
  );

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
              (term) => term._id === value.reference?._ref
            );
            const href = foo?.slug?.current ?? "";
            return (
              <Link className="arrow-link" href={`${slug}/glossaire/#${href}`}>
                {children}
              </Link>
            );
          },
        },
      }}
    />
  );

  useEffect(() => {
    if (isInitialRender === false && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isMed, isInitialRender]);

  const handleImageModal = useCallback(
    (index: number) => {
      const diagrams = pain.medicalApproach?.diagrams;
      const diagram: Diagram | undefined = diagrams?.[index];
      if (diagram) {
        setSelectedDiagram(diagram);
        setShowModal(true);
      }
    },
    [pain.medicalApproach?.diagrams]
  );

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      {showModal && selectedDiagram && (
        <Modal diagram={selectedDiagram} closeModal={closeModal} />
      )}
      <Breadcrumbs />
      <main>
        <div className="title-container">
          <div className="title">
            <h1>{pain.name}</h1>
            <span>
              Textes de{" "}
              <Link href="https://aemg-ge.com/medsexplain/" target="_blank">
                MedSexPlain
              </Link>{" "}
              &{" "}
              <Link href="https://www.sexopraxis.ch/" target="_blank">
                Sexopraxis
              </Link>{" "}
              | Illustrations de{" "}
              <Link href="https://noemiecreux.com/" target="_blank">
                Noémie Creux
              </Link>
            </span>
          </div>
          {pain.mainImage && (
            <Image
              className="pain-illu-cover"
              src={urlFor(pain.mainImage.asset._ref).url()}
              width={1000}
              height={1000}
              alt={pain.name}
              style={imageCoverHotspot}
              priority
            />
          )}
        </div>

        <div className="pain-nav-article-container">
          <PainDashboard
            pain={pain}
            isMed={isMed}
            setIsMed={setIsMed}
            setIsInitialRender={setIsInitialRender}
          />

          <div ref={ref} className="pain-article">
            {isMed ? (
              <>
                {pain.medicalApproach?.def && (
                  <div>
                    <h2 className="h3">Définition</h2>
                    <CustomPortableText
                      value={pain.medicalApproach?.def}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </div>
                )}

                {pain.medicalApproach?.diag && (
                  <>
                    <h2 className="h3">Diagnostic</h2>
                    <CustomPortableText
                      value={pain.medicalApproach?.diag}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.medicalApproach?.sympt && (
                  <>
                    <h2 className="h3">Symptômes</h2>
                    <CustomPortableText
                      value={pain.medicalApproach?.sympt}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.medicalApproach?.why && (
                  <>
                    <h2 className="h3">Pourquoi ça m’arrive ?</h2>
                    <CustomPortableText
                      value={pain.medicalApproach?.why}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.medicalApproach?.auto && (
                  <>
                    <h2 className="h3">Que puis-je faire solo ?</h2>
                    <CustomPortableText
                      value={pain.medicalApproach?.auto}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.medicalApproach?.pros && (
                  <>
                    <h2 className="h3">Qui consulter ?</h2>
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
                {pain.sexologicApproach && (
                  <h2 className="h3">Vivre avec la douleur</h2>
                )}

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

                {pain.sexologicApproach && <h2 className="h3">Sexualité</h2>}

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
                    <h2 className="h3">Santé mentale</h2>
                    <CustomPortableText
                      value={pain.sexologicApproach?.mental}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.sexologicApproach?.parenthood && (
                  <>
                    <h2 className="h3">Parentalité</h2>
                    <CustomPortableText
                      value={pain.sexologicApproach?.parenthood}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.sexologicApproach?.checkup && (
                  <>
                    <h2 className="h3">Avec les pros de la santé</h2>
                    <CustomPortableText
                      value={pain.sexologicApproach?.checkup}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.sexologicApproach?.treatments && (
                  <>
                    <h3>Quels traitements pour me soulager ?</h3>
                    <CustomPortableText
                      value={pain.sexologicApproach?.treatments}
                      slug={pain.slug.current}
                      glossary={glossary}
                    />
                  </>
                )}

                {pain.sexologicApproach?.pleasure && (
                  <>
                    <h2 className="h3">Plaisir/ anti-douleur</h2>
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
          {isMed && (
            <div className="diagrams-container">
              {pain.medicalApproach &&
                pain.medicalApproach.diagrams &&
                Array.isArray(pain.medicalApproach.diagrams) &&
                pain.medicalApproach.diagrams.map(renderDiagram)}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ArticlePain;

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
export const getStaticProps = async ({
  params,
}: {
  params: { pain: string };
}) => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]{
        ...,
        body[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              "slug": @->slug
            }
          }
        }
      }`,
      { currentSlug: pain }
    );
    const fetchedGlossary: GlossaryDetails[] | null = await client.fetch(
      `*[_type == "glossary" && references($painId)]`,
      { painId: fetchedPain?._id }
    );

    if (!fetchedPain || !fetchedGlossary) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        headerMenu,
        footerMenu,
        pain: fetchedPain,
        glossary: fetchedGlossary,
      },
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
};
