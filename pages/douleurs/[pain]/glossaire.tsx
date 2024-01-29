import {
  GlossaryDetail,
  GlossaryDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { GetStaticPaths } from "next";
import Layout from "../../../components/Layout";
import { PortableText } from "@portabletext/react";
import React from "react";
import ResourcePageLayout from "../../../components/reusables/ResourcePageLayout";
import { client } from "../../../config/sanity/client";
import { getStaticPathsPain } from "../../../utils/dataFetching";

const painGlossary = ({
  glossary,
  pain,
  headerMenu,
  footerMenu,
}: {
  pain: PainDetail;
  glossary: GlossaryDetails;
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const sortedGlossary = glossary.sort((a, b) => a.term.localeCompare(b.term));

  const termAnchor = (term: string) => {
    return term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace("œ", "oe")
      .toLowerCase();
  };

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <ResourcePageLayout
        pageName="Glossaire"
        pain={pain}
        relatedContent={sortedGlossary}
      >
        {sortedGlossary.map((term: GlossaryDetail) => {
          return (
            <div id={termAnchor(term.term)} key={term._id}>
              <h2 className="h3">{term.term}</h2>
              <PortableText value={term.def as any} />
            </div>
          );
        })}
      </ResourcePageLayout>
    </Layout>
  );
};
export const getStaticProps = async ({ params }: any) => {
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
        pain: fetchedPain,
        glossary: fetchedGlossary,
        headerMenu,
        footerMenu,
      },
    };
  } catch (error) {
    console.error("Error fetching glossary:", error);
    return {
      props: { pain: null, glossary: [] },
    };
  }
};
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
export default painGlossary;
