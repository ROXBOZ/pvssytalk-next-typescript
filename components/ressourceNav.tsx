import React, { useEffect, useState } from "react";

type Props = {};

const RessourceNav = (props: Props) => {
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <nav className="nav-directory">
      {!currentURL.endsWith("glossaire") && (
        <a href="glossaire">
          <span>Glossaire</span>
        </a>
      )}
      {!currentURL.endsWith("exercices") && (
        <a href="exercices">
          <span>Exercices</span>
        </a>
      )}
      {!currentURL.endsWith("medias") && (
        <a href="medias">
          <span>Médias</span>
        </a>
      )}
      {!currentURL.endsWith("annuaire") && (
        <a href="annuaire">
          <span>Annuaire</span>
        </a>
      )}
      <a href="/ressources">Toutes les ressources</a>
    </nav>
  );
};

export default RessourceNav;
