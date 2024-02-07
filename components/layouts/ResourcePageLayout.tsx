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
}> = ({ pageName, pain, relatedContent, children, typeform, regions }) => {
  const router = useRouter();
  const [, setTopList] = useState(0);

  const typeformDirectoryLink = typeform && typeform[0].directoryTypeform;
  const typeformMediaLink = typeform && typeform[0].mediasTypeform;

  const typeformLink =
    pageName === "Annuaire"
      ? typeformDirectoryLink
      : pageName === "Médias"
      ? typeformMediaLink
      : "";

  const allPains = pains.slice(1);
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

  const acronym =
    pain?.name === "Syndrome des ovaires polykystiques" ||
    pain?.name === "Syndrôme des ovaires polykystiques"
      ? "SOPK"
      : pain?.name.toLowerCase() ?? "";

  const DropDown = ({ title, array }: any) => {
    return (
      <div className="dropdown">
        <span className="drowpdown-title">
          {title} <span className="icon logo">↗</span>
        </span>
        <div className="dropdown-content">
          <ul>
            {array && array.map((item: any) => <li key={item}>{item}</li>)}
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
                  {acronym}
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
                  faire une recommendation
                </button>
              </Link>
            )}
          </div>

          {pain ? <PainNav pain={pain} /> : <RessourceNav />}

          {/* {pageName !== "Glossaire" ||
            (!pain && (
              <div className="dropdowns-container">
                <DropDown title="Douleurs" array={allPains} />
                <DropDown title="Régions" array={allRegions} />
              </div>
            ))} */}

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
