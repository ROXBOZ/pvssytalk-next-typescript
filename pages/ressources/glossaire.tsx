import {
  GlossaryDetail,
  GlossaryDetails,
  MenuDetail,
  PainDetail,
} from "../../types";
import React, { useEffect, useRef, useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import CustomHead from "../../components/CustomHead";
import GlossaryLayout from "../../components/layouts/GlossaryLayout";
import Layout from "../../components/layouts/Layout";
import ResourcePageLayout from "../../components/layouts/ResourcePageLayout";
import { client } from "../../config/sanity/client";

const Glossary = ({
  glossary,
  headerMenu,
  footerMenu,
  seo,
}: {
  glossary: GlossaryDetails;
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  seo: any;
}) => {
  const sortedGlossary = glossary?.sort((a, b) => a.term.localeCompare(b.term));
  const [, setEntries] = useState<string[]>([]);
  const termsContainerRef = useRef(null);
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

  return (
    <>
      <CustomHead seo={seo[0].glossary} />
      <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
        <div ref={termsContainerRef}>
          <ResourcePageLayout relatedContent={glossary} pageName="Glossaire">
            <GlossaryLayout letters={letters} termGroups={termGroups} />
          </ResourcePageLayout>
        </div>
      </Layout>
    </>
  );
};
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const glossary: GlossaryDetails = await client.fetch(`
      *[_type == "glossary" && !(_id in path("drafts.**"))]{
        ...,
        relatedPain[]->{
          name
        }
      }
    `);

    const pains: PainDetail = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );
    const seo: any = await client.fetch(
      '*[_type == "seoManager" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { glossary, pains, headerMenu, footerMenu, seo },
    };
  } catch (error) {
    console.error("Error fetching glossary:", error);
    return {
      props: { glossary: [], pains: [] },
    };
  }
};
export default Glossary;
