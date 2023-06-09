import React, { useState } from "react";
import { ourUrl } from "../utils/urls";

interface PainNavProps {
  pain: {
    name: string;
  };
  isMed: boolean;
  setIsMed: React.Dispatch<React.SetStateAction<boolean>>;
}

const PainNav = ({ pain, isMed, setIsMed }: PainNavProps) => {
  let currentURL;
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (typeof window !== "undefined") {
    currentURL = window.location.pathname;
    console.log("currentURL:", currentURL);
  } else {
    console.log("Window object is not available.");
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
    <nav className="pain-nav">
      <h3>
        Approche{" "}
        <span className="colored">
          {isMed ? <span>médicale</span> : <span>sexologique</span>}
        </span>
      </h3>
      <button onClick={switchArticle}>
        Voir l’approche{" "}
        {isMed ? <span>sexologique</span> : <span>médicale</span>}
      </button>

      <h3>Ressources</h3>
      <a href="glossaire">Glossaire</a>
      <a href="exercices">Exercices</a>
      <a href="medias">Littérature et médias</a>
      <h3>Partager</h3>
      <a href={`whatsapp://send?text=${ourUrl}${currentURL}`}>WhatsApp</a>
      <a href={`https://telegram.me/share/url?url=${ourUrl}${currentURL}`}>
        Telegram
      </a>
      <a href="mailto:?subject=Un%20lien%20qui%20pourrait%20t%E2%80%99int%C3%A9resser%20sur%20pvssy-talk.org&body=%C3%87a%20devrait%20t%E2%80%99int%C3%A9resser%20%3A%20https%3A%2F%2Fwww.pvssy-talk.org%2Fdouleurs%2Fvaginisme">
        Email
      </a>
      <a style={{ cursor: "pointer" }} onClick={copyUrlToClipboard}>
        Copier l’URL
      </a>
    </nav>
  );
};

export default PainNav;
