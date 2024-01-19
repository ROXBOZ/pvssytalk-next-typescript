import Link from "next/link";
import { PortableText } from "@portabletext/react";
import React from "react";

const Intro = ({ intro }: any) => {
  return (
    <div className="double-column-container">
      <div>
        <h2>{intro.pitch}</h2>
      </div>
      <div className="bigger-text">
        <PortableText value={intro.text as any} />
      </div>
      <nav className="nav-directory">
        <Link href="commencer/introduction">Introduction aux douleurs</Link>
        <Link href="commencer/guide">Guide d’auto-observation</Link>
        <Link href="commencer/consultation">Qui consulter ?</Link>
      </nav>
    </div>
  );
};

export default Intro;
