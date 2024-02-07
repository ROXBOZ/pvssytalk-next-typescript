import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import Link from "next/link";
import { PainDashboardProps } from "../types";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { websiteURL } from "../utils/urls";

const PainDashboard = ({
  pain,
  isMed,
  setIsMed,
  setIsInitialRender,
}: PainDashboardProps) => {
  const [currentURL, setCurrentURL] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const currentPath = window.location.pathname;
    const constructedURL = websiteURL + currentPath;
    setCurrentURL(constructedURL);
  }, []);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const toggleSwitch = () => setIsMed(!isMed);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <nav className="pain-nav">
      <h3>Approche</h3>
      <div className="switch" data-isOn={isMed} onClick={toggleSwitch}>
        <div className="types">
          <span>sexologique</span>
          <span>médicale</span>
        </div>
        <motion.div className="handle" layout transition={spring} />
      </div>
      <div className="ressources-nav">
        <h3>Ressources</h3>
        <Link href={`${pain.slug.current}/annuaire`}>Annuaire</Link>
        <Link href={`${pain.slug.current}/exercices`}>Exercices</Link>
        <Link href={`${pain.slug.current}/glossaire`}>Glossaire</Link>
        <Link href={`${pain.slug.current}/medias`}>Médias</Link>
      </div>

      <div className="partage-nav" aria-label="partager">
        <Link
          aria-label="partager par WhatsApp"
          href={`whatsapp://send?text=${currentURL}`}
        >
          <FontAwesomeIcon icon={faWhatsapp as IconDefinition} />
        </Link>
        <Link
          aria-label="partager par Telegram"
          href={`https://telegram.me/share/url?url=${currentURL}`}
        >
          <FontAwesomeIcon icon={faTelegram as IconDefinition} />
        </Link>
        <Link
          aria-label="partager par email"
          href={`mailto:?subject=Un%20lien%20qui%20pourrait%20t%E2%80%99int%C3%A9resser%20sur%20pvssy-talk.org&body=%C3%87a%20devrait%20t%E2%80%99int%C3%A9resser%20%3A%20https%3A%2F%2Fwww.pvssy-talk.org%2Fdouleurs/${pain.name.toLowerCase()}`}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </Link>
        <div
          className="a"
          onClick={copyUrlToClipboard}
          aria-label="copier l'url dans le presse-papier"
        >
          <FontAwesomeIcon className="link-icon" icon={faLink} />
        </div>
        {isCopied && <span className="copied">copié !</span>}
      </div>
    </nav>
  );
};

export default PainDashboard;
