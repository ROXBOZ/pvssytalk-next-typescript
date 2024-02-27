import React, { useState } from "react";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function PartageNav(pain: { pain: string }) {
  const [currentURL, setCurrentURL] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  return (
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
        href={`mailto:?subject=Un%20lien%20qui%20pourrait%20t%E2%80%99int%C3%A9resser%20sur%20pvssy-talk.org&body=%C3%87a%20devrait%20t%E2%80%99int%C3%A9resser%20%3A%20https%3A%2F%2Fwww.pvssy-talk.org%2Fdouleurs/${pain.pain.toLowerCase()}`}
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
  );
}

export default PartageNav;
