import { GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { GlossaryDetail, GlossaryDetails, PainDetails } from "../../types";
import { PortableText } from "@portabletext/react";
import RessourceNav from "../../components/ressourceNav";
import { getStaticPropsGlossary } from "../../utils/dataFetching";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Filters, { pains as painList } from "../../components/reusables/Filters";

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
  // const letterContainerRef = useRef(0);
  const letterContainerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const termsContainerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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
    // const uniqueLetters = [...new Set(firstLetters)];
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
            <form>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                className="search-bar"
                placeholder="Rechercher"
                onChange={handleInputChange}
              />
            </form>
            <Filters
              filterOptions={painList}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
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
