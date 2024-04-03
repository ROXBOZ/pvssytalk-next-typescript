import Link from "next/link";
import { PortableText } from "@portabletext/react";
import React from "react";

function NavBlock({ data }: any) {
  const { anchor } = data;

  return (
    <div id={anchor} className="navBlock double-column-container snap-section">
      <div>
        <h2>{data.pitch}</h2>
      </div>
      <div className="bigger-text">
        <PortableText value={data.text as any} />
        <nav className="nav-directory">
          {data.navigationType === "pages" &&
            data.navigation &&
            data.navigation.map((page: any, index: number) => (
              <Link key={index} href={page.slug.current}>
                {page.title}
              </Link>
            ))}

          {data.navigationType === "selfCare" && (
            <>
              <Link href="/ressources/annuaire">Annuaire</Link>
              <Link href="/ressources/exercices">Exercices</Link>
            </>
          )}
          {data.navigationType === "selfLearning" && (
            <>
              <Link href="/ressources/glossaire">Glossaire</Link>
              <Link href="/ressources/medias">Médias</Link>
              <Link href="/ressources/agenda">Agenda</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default NavBlock;
