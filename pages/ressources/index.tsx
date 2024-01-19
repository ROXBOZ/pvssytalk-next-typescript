import React, { useEffect, useState } from "react";

import Link from "next/link";

const Ressources = () => {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <>
      <div
        className={`double-column-container ${
          currentURL.endsWith("ressources") && "no-border"
        }`}
      >
        <div>
          {currentURL.endsWith("ressources") ? (
            <h1>Ressources supplémentaires</h1>
          ) : (
            <h2>Ressources supplémentaires</h2>
          )}
        </div>
        <div>
          <nav className="nav-directory">
            <Link href="ressources/agenda">Agenda</Link>
            <Link href="ressources/annuaire">Annuaire</Link>
            <Link href="ressources/exercices">Exercices</Link>
            <Link href="ressources/glossaire">Glossaire</Link>
            <Link href="ressources/medias">Médias</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Ressources;
