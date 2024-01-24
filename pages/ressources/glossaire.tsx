import {
  GlossaryDetail,
  GlossaryDetails,
  MenuDetail,
  PainDetail,
} from "../../types";
import React, { useEffect, useRef, useState } from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import RessourceNav from "../../components/ressourceNav";
import { client } from "../../config/sanity/client";
import { useRouter } from "next/router";

const Glossary = ({
  glossary,
  headerMenu,
  footerMenu,
}: {
  glossary: GlossaryDetails;
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const sortedGlossary = glossary?.sort((a, b) => a.term.localeCompare(b.term));
  const [, setEntries] = useState<string[]>([]);
  const [, setAnchorPosition] = useState(0);
  const [, setTopList] = useState(0);
  const letterContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const termsContainerRef = useRef(null);
  const [, setSearchTerm] = useState("");

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
  const letters = Object.keys(termGroups).sort();

  const scrollToAnchor = (anchor: string) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(anchor);
    if (!element) return;

    const top = element.offsetTop;
    setAnchorPosition(top);

    if (letterContainerRef.current) {
      setTopList(letterContainerRef.current.offsetTop);
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: "smooth" });
      if (letterContainerRef.current) {
        setTopList(letterContainerRef.current.offsetTop);
      }
    });
  };

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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value) {
      const matchingTerm = sortedGlossary.find((term) =>
        term.term.toLowerCase().startsWith(event.target.value.toLowerCase())
      );

      if (matchingTerm) {
        const anchor = matchingTerm.term[0].toUpperCase();
        scrollToAnchor(anchor);
      }
    }
  };

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <div ref={termsContainerRef} className="double-column-containers-group">
        <div className="double-column-container">
          <div className="fixed-container">
            <h1>
              Glossaire <sup>{glossary.length}</sup>
            </h1>
            <div className="glossary-dashboard">
              <RessourceNav />
              <div className="letter-link-container">
                {Array.from({ length: 26 }, (_, i) =>
                  String.fromCharCode("A".charCodeAt(0) + i)
                ).map((letter, index) => (
                  <Link
                    className="letter-link"
                    key={index}
                    href={`${router}/#${letter.toLowerCase()}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToAnchor(letter);
                    }}
                  >
                    {letter}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            {letters.map((letter) => {
              return (
                <div className="letter-title" key={letter}>
                  <p id={letter} className="h1">
                    {letter}
                    {letter.toLowerCase()}
                  </p>
                  {termGroups[letter].map((term: GlossaryDetail) => (
                    <div className="glossary-term" key={term._id}>
                      <h2
                        className="h3 term-entry"
                        style={{
                          marginTop: "revert",
                        }}
                      >
                        {term.term}
                      </h2>
                      <PortableText value={term.def as any} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const footerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
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
    return {
      props: { glossary, pains, headerMenu, footerMenu },
    };
  } catch (error) {
    console.error("Error fetching glossary:", error);
    return {
      props: { glossary: [], pains: [] },
    };
  }
};
export default Glossary;
