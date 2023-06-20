import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const Ressources = (props: Props) => {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <div className="double-column-container">
      <div>
        {currentURL.endsWith("ressources") ? (
          <>
            <h1>Ressources supplémentaires</h1>
            <p style={{ backgroundColor: "yellow" }}>
              should not have a border-top
            </p>
          </>
        ) : (
          <h2>Ressources supplémentaires</h2>
        )}
      </div>
      <div>
        <nav className="nav-directory">
          <Link href="ressources/glossaire">Glossaire</Link>
          <Link href="ressources/exercices">Exercices</Link>
          <Link href="ressources/medias">Médias</Link>
          <Link href="ressources/annuaire">Annuaire</Link>
        </nav>
      </div>
    </div>
  );
};

export default Ressources;
