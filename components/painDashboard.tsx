import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import Link from "next/link";
import { PainDashboardProps } from "../types";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { websiteURL } from "../utils/urls";

const painDashboard = ({
  pain,
  isMed,
  setIsMed,
  setIsInitialRender,
}: PainDashboardProps) => {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const constructedURL = websiteURL + currentPath;
    setCurrentURL(constructedURL);
  }, []);

  const switchArticle = () => {
    setIsMed((prevIsMed) => !prevIsMed);
    setIsInitialRender(false);
  };

  return (
    <nav className="pain-nav">
      <h3>Approche</h3>
      <div className="switcher">
        <button onClick={switchArticle} className={`${isMed && "active"}`}>
          médicale
        </button>
        <button onClick={switchArticle} className={`${!isMed && "active"}`}>
          sexologique
        </button>
      </div>

      <div className="ressources-nav">
        <h3>Ressources</h3>
        <Link href={`${pain.slug.current}/annuaire`}>Annuaire</Link>
        <Link href={`${pain.slug.current}/exercices`}>Exercices</Link>
        <Link href={`${pain.slug.current}/glossaire`}>Glossaire</Link>
        <Link href={`${pain.slug.current}/medias`}>Médias</Link>
      </div>

      <div className="partage-nav">
        <Link href={`whatsapp://send?text=${currentURL}`}>
          <FontAwesomeIcon icon={faWhatsapp as IconDefinition} />
        </Link>
        <Link href={`https://telegram.me/share/url?url=${currentURL}`}>
          <FontAwesomeIcon icon={faTelegram as IconDefinition} />
        </Link>
        <Link
          href={`mailto:?subject=Un%20lien%20qui%20pourrait%20t%E2%80%99int%C3%A9resser%20sur%20pvssy-talk.org&body=%C3%87a%20devrait%20t%E2%80%99int%C3%A9resser%20%3A%20https%3A%2F%2Fwww.pvssy-talk.org%2Fdouleurs/${pain.name.toLowerCase()}`}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </Link>
      </div>
    </nav>
  );
};

export default painDashboard;
