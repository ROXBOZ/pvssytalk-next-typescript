import Link from "next/link";
import React from "react";

type Props = {};

const Ressources = (props: Props) => {
  return (
    <div className="double-column-container">
      <div>
        <h2>Ressources supplémentaires</h2>
      </div>
      <div>
        <nav className="nav-directory">
          <Link href="ressources/glossaire">Glossaire</Link>
          <Link href="ressources/exercices">Exercices</Link>
          <Link href="ressources/medias">Littérature et médias</Link>
        </nav>
      </div>
    </div>
  );
};

export default Ressources;
