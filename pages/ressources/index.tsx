import Link from "next/link";
import React from "react";

type Props = {};

const Ressources = (props: Props) => {
  return (
    <div>
      <h2>Ressources</h2>
      <nav className="nav-directory">
        <Link href="ressources/glossaire">Glossaire</Link>
        <Link href="ressources/exercices">Exercices</Link>
        <Link href="ressources/medias">Littérature et médias</Link>
      </nav>
    </div>
  );
};

export default Ressources;
