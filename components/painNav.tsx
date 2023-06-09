import React from "react";
import { ourUrl } from "../utils/urls";

interface PainNavProps {
  pain: {
    name: string;
  };
}

const PainNav = ({ pain }: PainNavProps) => {
  let currentURL;
  if (typeof window !== "undefined") {
    currentURL = window.location.pathname;
    console.log("currentURL:", currentURL);
  } else {
    console.log("Window object is not available.");
  }

  return (
    <nav className="pain-nav">
      <h3>
        Ressources <span className="colored nowrap">{pain.name}</span>
      </h3>
      <a href="/glossaire">Glossaire</a>
      <a href="/exercices">Exercices</a>
      <a href="/medias">Littérature et médias</a>
      <h4>Partager</h4>
      <a href={`whatsapp://send?text=${ourUrl}${currentURL}`}>WhatsApp</a>
      <a href={`https://telegram.me/share/url?url=${ourUrl}${currentURL}`}>
        Telegram
      </a>
      <a href="mailto:hello@pvssy-talk.org">Email</a>
    </nav>
  );
};

export default PainNav;
