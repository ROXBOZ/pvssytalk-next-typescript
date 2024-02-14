import React, { useEffect, useState } from "react";

import Link from "next/link";

const RessourceNav = () => {
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <nav className="nav-directory h4">
      {!currentURL.endsWith("agenda") && (
        <Link href="agenda">
          <span>Agenda</span>
        </Link>
      )}
      {!currentURL.endsWith("annuaire") && (
        <Link href="annuaire">
          <span>Annuaire</span>
        </Link>
      )}
      {!currentURL.endsWith("exercices") && (
        <Link href="exercices">
          <span>Exercices</span>
        </Link>
      )}
      {!currentURL.endsWith("glossaire") && (
        <Link href="glossaire">
          <span>Glossaire</span>
        </Link>
      )}
      {!currentURL.endsWith("medias") && (
        <Link href="medias">
          <span>Médias</span>
        </Link>
      )}
    </nav>
  );
};

export default RessourceNav;
