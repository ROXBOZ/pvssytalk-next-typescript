import { GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { client } from "../../utils/sanity/client";
import { GlossaryDetail, GlossaryDetails, PainDetails } from "../../types";
import { PortableText } from "@portabletext/react";
import RessourceNav from "../../components/ressourceNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Glossary = ({
  glossary,
  pains,
}: {
  pains: PainDetails;
  glossary: GlossaryDetails;
}) => {
  const sortedGlossary = glossary?.sort((a, b) => a.term.localeCompare(b.term));

  const [, setAnchorPosition] = useState(0);
  const [topList, setTopList] = useState(0);
  const letterContainerRef = useRef(null);

  const [entries, setEntries] = useState([]);

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

  // const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   event.preventDefault();
  //   const searchTerm: string = event.target.value.toLowerCase();
  //   const termElements: NodeListOf<Element> =
  //     document.querySelectorAll(".term-entry");

  //   let matchedTermElement: Element | null = null;
  //   for (let i = 0; i < termElements.length; i++) {
  //     const termText: string = termElements[i]
  //       .querySelector("h3")!
  //       .textContent!.toLowerCase();
  //     if (termText.startsWith(searchTerm)) {
  //       matchedTermElement = termElements[i];
  //       break;
  //     }
  //   }

  //   if (matchedTermElement) {
  //     const id: string | null = matchedTermElement.querySelector("h3")!.id;
  //     if (id) {
  //       const targetElement: HTMLElement | null = document.getElementById(id);
  //       if (targetElement) {
  //         const top: number = targetElement.offsetTop;
  //         setTimeout(() => {
  //           window.scrollTo({ top, behavior: "smooth" });
  //         }, 1000);
  //       }
  //     }
  //   }
  // };

  // const scrollToAnchor = (anchor) => {
  //   if (typeof window !== "undefined") {
  //     const element = document.getElementById(anchor);
  //     if (element) {
  //       const top = element.offsetTop;
  //       window.scrollTo({ top, behavior: "smooth" });
  //       setAnchorPosition(top);
  //       setTopList(letterContainerRef.current.offsetTop);
  //     }
  //   }
  // };

  useEffect(() => {
    const letterLinks = document.querySelectorAll(".letter-link");

    letterLinks.forEach((link) => {
      const letter = link.textContent?.toLowerCase();

      if (termGroups && letter && termGroups[letter]) {
        const entriesStartingWithLetter = termGroups[letter];
        const isDisabled = entriesStartingWithLetter.length === 0;

        if (isDisabled) {
          link.classList.add("disabled");
        } else {
          link.classList.remove("disabled");
        }
      }
    });
  }, [termGroups]);

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Glossaire</h1>
          <div className="glossary-dashboard">
            <RessourceNav />
            <div className="letter-link-container">
              {Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode("A".charCodeAt(0) + i)
              ).map((letter, index) => (
                <a
                  className="letter-link"
                  key={index}
                  // href={`${window.location.pathname}/#${letter}`}
                  // onClick={(event) => {
                  //   event.preventDefault();
                  //   scrollToAnchor(letter);
                  // }}
                >
                  {letter}
                </a>
              ))}
            </div>
            <form>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                className="search-bar"
                // onChange={handleInput}
                type="text"
                placeholder="Rechercher"
              />
            </form>
            <span style={{ backgroundColor: "yellow" }}>
              letter link should work, letter disabled should be opacity low,
              search bar
            </span>
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
                <div className="term-entry" key={term._id}>
                  <h2 className="h3">{term.term}</h2>
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

export default Glossary;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const glossary: GlossaryDetails = await client.fetch(
      '*[_type == "glossary" && !(_id in path("drafts.**"))]{...}'
    );
    const pains: PainDetails = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );
    return {
      props: { glossary, pains },
    };
  } catch (error) {
    console.error("Error fetching glossary:", error);
    return {
      props: { glossary: [], pains: [] },
    };
  }
};
