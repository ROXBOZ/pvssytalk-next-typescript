import React, { useEffect, useState } from "react";

import Link from "next/link";
import { PainDashboardProps } from "../types";
import { websiteURL } from "../utils/urls";

const painDashboard = ({ pain, isMed, setIsMed }: PainDashboardProps) => {
  const [, setIsCopied] = useState<boolean>(false);
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const constructedURL = websiteURL + currentPath;
    setCurrentURL(constructedURL);
  }, []);

  let currentPath;
  if (typeof window !== "undefined") {
    currentPath = window.location.pathname;
  }

  const switchArticle = () => {
    setIsMed((prevIsMed) => !prevIsMed);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <>
      <nav className="pain-nav">
        <h3>
          Approche{" "}
          <span className="colored">
            {isMed ? <span>médicale</span> : <span>sexo</span>}
          </span>
        </h3>
        <button
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={switchArticle}
        >
          {isMed ? <span>Sexologie</span> : <span>Médical</span>} ⇆
        </button>
        <h3>Ressources</h3>
        <Link href={`${pain.slug.current}/glossaire`}>Glossaire</Link>
        <Link href={`${pain.slug.current}/exercices`}>Exercices</Link>
        <Link href={`${pain.slug.current}/medias`}>Médias</Link>
        <Link href={`${pain.slug.current}/annuaire`}>Annuaire</Link>
        <h3>Partager</h3>
        <span style={{ cursor: "pointer" }} onClick={copyUrlToClipboard}>
          <a> Copier l’URL</a>
        </span>
        <Link href={`whatsapp://send?text=${currentURL}`}>WhatsApp</Link>
        <Link href={`https://telegram.me/share/url?url=${currentURL}`}>
          Telegram
        </Link>
        <Link href="mailto:?subject=Un%20lien%20qui%20pourrait%20t%E2%80%99int%C3%A9resser%20sur%20pvssy-talk.org&body=%C3%87a%20devrait%20t%E2%80%99int%C3%A9resser%20%3A%20https%3A%2F%2Fwww.pvssy-talk.org%2Fdouleurs%2Fvaginisme">
          Email
        </Link>

        <p className="smaller-text">
          Rédaction :{" "}
          {isMed ? (
            <em className="colored">MedSexplain</em>
          ) : (
            <em className="colored">Sexopraxis</em>
          )}
        </p>
      </nav>
    </>
  );
};

export default painDashboard;
