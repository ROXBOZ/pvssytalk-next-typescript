import { GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { GlossaryDetail, GlossaryDetails, PainDetails } from "../../types";
import { PortableText } from "@portabletext/react";
import RessourceNav from "../../components/ressourceNav";
import { getStaticPropsGlossary } from "../../props/dataFetching";
import { useRouter } from "next/router";

const Glossary = ({
  glossary,
  pains,
}: {
  pains: PainDetails;
  glossary: GlossaryDetails;
}) => {
  const sortedGlossary = glossary?.sort((a, b) => a.term.localeCompare(b.term));
  const [entries, setEntries] = useState<string[]>([]);
  const [, setAnchorPosition] = useState(0);
  const [topList, setTopList] = useState(0);
  const letterContainerRef = useRef(0);
  const router = useRouter();
  const termsContainerRef = useRef(null);

  const termGroups: { [key: string]: GlossaryDetail[] } =
    sortedGlossary?.reduce(
      (groups: { [key: string]: GlossaryDetail[] }, term: GlossaryDetail) => {
        const firstLetter = term.term[0].toUpperCase();
        if (!groups[firstLetter]) {
          groups[firstLetter] = [];
        }
        groups[firstLetter].push(term);
        return groups;
      },
      {}
    );
  const letters = Object.keys(termGroups).sort();

  useEffect(() => {
    const firstLetters = sortedGlossary.map((term) =>
      term.term[0].toLowerCase()
    );
    const uniqueLetters = [...new Set(firstLetters)];
    setEntries(uniqueLetters);
  }, [sortedGlossary]);

  const scrollToAnchor = (anchor: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(anchor);
      if (element) {
        const top = element.offsetTop;
        setAnchorPosition(top);
        window.requestAnimationFrame(() => {
          window.scrollTo({ top, behavior: "smooth" });
          setTopList(letterContainerRef.current.offsetTop);
        });
      }
    }
  };

  useEffect(() => {
    const letterLinks =
      document.querySelectorAll<HTMLAnchorElement>(".letter-link");

    for (const letterLink of letterLinks) {
      const letter = letterLink.innerText.toLowerCase();

      if (!entries.includes(letter)) {
        letterLink.classList.add("disabled");
      } else {
        letterLink.classList.remove("disabled");
      }
    }
  }, [entries]);

  return (
    <div ref={termsContainerRef} className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Glossaire <sup>{glossary.length}</sup>
          </h1>
          <div className="glossary-dashboard">
            <RessourceNav />
            <div className="letter-link-container">
              {Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode("A".charCodeAt(0) + i)
              ).map((letter, index) => (
                <a
                  className="letter-link"
                  key={index}
                  href={`${router}/#${letter.toLowerCase()}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToAnchor(letter);
                  }}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div>
          {letters.map((letter) => (
            <div className="letter-title" key={letter}>
              <p id={letter} className="h1">
                {letter}
                {letter.toLowerCase()}
              </p>
              {termGroups[letter].map((term: GlossaryDetail) => (
                <div className="glossary-term" key={term._id}>
                  <h2 className="h3 term-entry">{term.term}</h2>
                  <div className="related-pain-container">
                    {term.relatedPain &&
                      term.relatedPain.map((related) => {
                        const relatedPain = pains.find(
                          (pain) => pain._id === related._ref
                        );
                        if (relatedPain) {
                          return (
                            <a
                              href={`/douleurs/${relatedPain.slug.current}`}
                              className="nowrap"
                              key={relatedPain._id}
                            >
                              {relatedPain.name.toLowerCase()}
                            </a>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <PortableText value={term.def as any} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const getStaticProps: GetStaticProps = getStaticPropsGlossary;
export default Glossary;
