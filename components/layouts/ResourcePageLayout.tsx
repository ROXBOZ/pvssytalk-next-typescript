import React, { ReactNode, useRef, useState } from "react";

import Link from "next/link";
import { PainDetail } from "../../types";
import PainNav from "../PainNav";
import RessourceNav from "../RessourceNav";
import { pains } from "../reusables/Filters";
import { useRouter } from "next/router";
import useWindowSize from "../../utils/useWindowSize";

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
  const is600Max = useWindowSize();

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
          <span className="icon logo">↗</span>
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
        <div>
          <div className="fixed-container">
            <div className="title">
              <h1>
                {pageName}{" "}
                <span
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  {pain && pain.name && (
                    <Link
                      href={`/douleurs/${pain.slug.current}`}
                      className="colored logo"
                    >
                      {acronym(pain.name)}
                    </Link>
                  )}{" "}
                  <sup className={`${pain ? "no-color" : "color"}`}>
                    {relatedContent &&
                      relatedContent.filter(
                        (item: any) => item.isValidated === true
                      ).length}
                    {!pain && typeformLink && (
                      <Link
                        target="_blank"
                        style={{ border: "0" }}
                        href={typeformLink}
                      >
                        <button className="primary-button">recommander</button>
                      </Link>
                    )}
                  </sup>
                </span>
              </h1>
            </div>
            {pageName === "Annuaire" && (
              <div>
                <span>
                  → Centres de conseil de{" "}
                  <Link href="https://www.sante-sexuelle.ch/centres-de-conseil">
                    Santé Sexuelle Suisse
                  </Link>
                </span>
                <br />
                <span>
                  →{" "}
                  <Link href="https://adopteunegyneco.wordpress.com/">
                    Adopte un gynéco
                  </Link>
                </span>
              </div>
            )}
            {pain && !is600Max ? (
              <PainNav pain={pain} />
            ) : !pain && !is600Max ? (
              <RessourceNav />
            ) : null}
            {pageName !== "Glossaire" && (
              <div className="dropdowns-container">
                {!pain && <DropDown title="Douleur" array={allPains} />}
                {(pageName === "Annuaire" || pageName === "Agenda") && (
                  <DropDown title="Région" array={allRegions} />
                )}
                {(!pain ||
                  pageName === "Annuaire" ||
                  pageName === "Agenda") && (
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
        </div>
        <div>{children}</div>
        {!pain && is600Max ? (
          <div className="resources-nav-mobile">
            <h3>Autres ressources</h3>
            <RessourceNav />
          </div>
        ) : pain && is600Max ? (
          <div className="resources-nav-mobile">
            <h3>Autres ressources</h3>
            <PainNav pain={pain} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ResourcePageLayout;
