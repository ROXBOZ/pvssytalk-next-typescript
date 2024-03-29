import React, { useEffect, useState } from "react";

import { PainNavProps } from "../types";

const PainNav = ({ pain }: PainNavProps) => {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  const acronym =
    pain?.name === "Syndrome des ovaires polykystiques" ||
    pain?.name === "Syndrôme des ovaires polykystiques"
      ? "SOPK"
      : pain?.name.toLowerCase() ?? "";

  return (
    <nav className="nav-directory h4">
      {!currentURL.endsWith("annuaire") && (
        <a href="annuaire">
          <span>
            Annuaire <span className="colored">{acronym}</span>
          </span>
        </a>
      )}
      {!currentURL.endsWith("exercices") && (
        <a href="exercices">
          <span>
            Exercices <span className="colored">{acronym}</span>
          </span>
        </a>
      )}
      {!currentURL.endsWith("glossaire") && (
        <a href="glossaire">
          <span>
            Glossaire <span className="colored">{acronym}</span>
          </span>
        </a>
      )}

      {!currentURL.endsWith("medias") && (
        <a href="medias">
          <span>
            Médias <span className="colored">{acronym}</span>
          </span>
        </a>
      )}

      {currentURL.endsWith("glossaire") ? (
        <a href="/ressources/glossaire">
          <span>Glossaire complet</span>
        </a>
      ) : currentURL.endsWith("exercices") ? (
        <a href="/ressources/exercices">
          <span>Tous les exercices</span>
        </a>
      ) : currentURL.endsWith("medias") ? (
        <a href="/ressources/medias">
          <span>Médiathèque complète</span>
        </a>
      ) : currentURL.endsWith("annuaire") ? (
        <a href="/ressources/annuaire">
          <span>Annuaire complet</span>
        </a>
      ) : null}
    </nav>
  );
};

export default PainNav;
