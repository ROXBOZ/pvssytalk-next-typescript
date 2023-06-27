import React, { useEffect, useState } from "react";
import { websiteURL } from "../utils/urls";
import { PainDashboardProps } from "../types";

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
          <span className="colored ">
            Approche {isMed ? <span>médicale</span> : <span>sexologique</span>}
          </span>
        </h3>
        <button onClick={switchArticle}>
          {isMed ? (
            <span>Approche sexologique</span>
          ) : (
            <span>Approche médicale</span>
          )}
        </button>
        <h3>Ressources</h3>
        <a href={`${pain.slug.current}/glossaire`}>Glossaire</a>
        <a href={`${pain.slug.current}/exercices`}>Exercices</a>
        <a href={`${pain.slug.current}/medias`}>Médias</a>
        <a href={`${pain.slug.current}/annuaire`}>Annuaire</a>
        <h3>Partager</h3>
        <a style={{ cursor: "pointer" }} onClick={copyUrlToClipboard}>
          Copier l’URL
        </a>
        <a href={`whatsapp://send?text=${currentURL}`}>WhatsApp</a>
        <a href={`https://telegram.me/share/url?url=${currentURL}`}>Telegram</a>
        <a href="mailto:?subject=Un%20lien%20qui%20pourrait%20t%E2%80%99int%C3%A9resser%20sur%20pvssy-talk.org&body=%C3%87a%20devrait%20t%E2%80%99int%C3%A9resser%20%3A%20https%3A%2F%2Fwww.pvssy-talk.org%2Fdouleurs%2Fvaginisme">
          Email
        </a>

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
