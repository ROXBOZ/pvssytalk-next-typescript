import {
  GlossaryDetail,
  GlossaryDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import React, { useEffect, useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import { GetStaticPaths } from "next";
import GlossaryLayout from "../../../components/layouts/GlossaryLayout";
import Layout from "../../../components/layouts/Layout";
import ResourcePageLayout from "../../../components/layouts/ResourcePageLayout";
import { client } from "../../../config/sanity/client";
import { getStaticPathsPain } from "../../../utils/dataFetching";

const painGlossary = ({
  glossary,
  pain,
  headerMenu,
  footerMenu,
  painsSlugs,
  marquee,
}: {
  pain: PainDetail;
  glossary: GlossaryDetails;
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  painsSlugs: any;
  marquee: any;
}) => {
  const sortedGlossary = glossary?.sort((a, b) => a.term.localeCompare(b.term));
  const [, setEntries] = useState<string[]>([]);
  const termGroups: { [key: string]: GlossaryDetail[] } = {};

  if (sortedGlossary) {
    for (const term of sortedGlossary) {
      const firstLetter = term.term[0].toUpperCase();

      if (!termGroups[firstLetter]) {
        termGroups[firstLetter] = [];
      }
      termGroups[firstLetter].push(term);
    }
  }

  useEffect(() => {
    const firstLetters = sortedGlossary.map((term) =>
      term.term[0].toLowerCase()
    );
    const uniqueLetters = Array.from(new Set(firstLetters));
    setEntries(uniqueLetters);

    const letterLinks =
      document.querySelectorAll<HTMLAnchorElement>(".letter-link");
    letterLinks.forEach((letterLink) => {
      const letter = letterLink.innerText.toLowerCase();
      letterLink.classList.toggle("disabled", !uniqueLetters.includes(letter));
    });
  }, [sortedGlossary, setEntries]);

  const letters = Object.keys(termGroups).sort();
  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  return (
    <Layout
      painsSlugs={painsSlugs}
      headerMenu={headerMenu}
      footerMenu={footerMenu}
      marquee={marquee}
    >
      <ResourcePageLayout
        pageName="Glossaire"
        pain={pain}
        relatedContent={sortedGlossary}
        selectedPain={selectedPain}
        setSelectedPain={setSelectedPain}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      >
        <GlossaryLayout letters={letters} termGroups={termGroups} />
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

    const marquee: any = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))]{marquee}'
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
        marquee,
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
