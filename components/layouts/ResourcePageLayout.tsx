import React, { ReactNode, useRef, useState } from "react";

import Link from "next/link";
import { PainDetail } from "../../types";
import PainNav from "../PainNav";
import RessourceNav from "../RessourceNav";
import { pains } from "../reusables/Filters";
import { useRouter } from "next/router";

const ResourcePageLayout: React.FC<{
  pageName: string;
  pain?: PainDetail;
  relatedContent?: any;
  children?: ReactNode;
  typeform?: any;
  regions?: any;
  selectedPain: string;
  setSelectedPain: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
}> = ({
  pageName,
  pain,
  relatedContent,
  children,
  typeform,
  regions,
  selectedPain,
  setSelectedPain,
  selectedRegion,
  setSelectedRegion,
}) => {
  const router = useRouter();
  const [, setTopList] = useState(0);

  const typeformDirectoryLink = typeform && typeform[0].directoryTypeform;
  const typeformMediaLink = typeform && typeform[0].mediasTypeform;
  const typeformAgendaLink = typeform && typeform[0].agendaTypeform;

  const typeformLink =
    pageName === "Annuaire"
      ? typeformDirectoryLink
      : pageName === "Médias"
      ? typeformMediaLink
      : pageName === "Agenda"
      ? typeformAgendaLink
      : "";

  const capitalizeFirstLetter = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const allPains = pains.slice(1).map(capitalizeFirstLetter);
  const allRegions = regions && regions.map((region: any) => region.name);

  const [, setAnchorPosition] = useState(0);
  const letterContainerRef = useRef<HTMLDivElement | null>(null);

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

  const acronym = (e: string): string => {
    return e === "Syndrome des ovaires polykystiques" ||
      e === "Syndrôme des ovaires polykystiques" ||
      e === "syndrome des ovaires polykystiques" ||
      e === "syndrôme des ovaires polykystiques"
      ? "SOPK"
      : e;
  };

  const DropDown = ({ title, array }: any) => {
    return (
      <div className="dropdown">
        <span className="drowpdown-title">
          {title === "Douleur" && selectedPain ? (
            capitalizeFirstLetter(acronym(selectedPain))
          ) : title === "Douleur" && !selectedPain ? (
            <span className="placeholder">{title}</span>
          ) : title !== "Douleur" && selectedRegion ? (
            selectedRegion
          ) : (
            <span className="placeholder">{title}</span>
          )}
          <span className="icon logo" style={{ rotate: "45deg" }}>
            &#x2715;
          </span>
        </span>
        <div className="dropdown-content">
          <ul>
            {array &&
              array.map((item: any) => (
                <li
                  className="animate"
                  onClick={() => {
                    title === "Douleur"
                      ? setSelectedPain(item)
                      : setSelectedRegion(item);
                  }}
                  key={item}
                >
                  {acronym(item)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div className="fixed-container">
          <div className="title">
            <h1>
              {pageName}{" "}
              {pain && pain.name && (
                <Link href="./" className="colored logo">
                  {acronym(pain.name)}
                </Link>
              )}{" "}
              <sup className={`${pain ? "no-color" : "color"}`}>
                {relatedContent &&
                  relatedContent.filter(
                    (item: any) => item.isValidated === true
                  ).length}
              </sup>
            </h1>
            {!pain && typeformLink && (
              <Link target="_blank" style={{ border: 0 }} href={typeformLink}>
                <button className="primary-button">
                  recommander <span className="icon logo">→</span>
                </button>
              </Link>
            )}
          </div>

          {pain ? <PainNav pain={pain} /> : <RessourceNav />}

          {pageName !== "Glossaire" && (
            <div className="dropdowns-container">
              {!pain && <DropDown title="Douleur" array={allPains} />}
              {(pageName === "Annuaire" || pageName === "Agenda") && (
                <DropDown title="Région" array={allRegions} />
              )}
              {(!pain || pageName === "Annuaire" || pageName === "Agenda") && (
                <button
                  className="reset-button"
                  onClick={() => {
                    setSelectedPain("");
                    setSelectedRegion("");
                  }}
                >
                  &#x2715;
                </button>
              )}
            </div>
          )}

          {pageName === "Glossaire" && (
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
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ResourcePageLayout;
