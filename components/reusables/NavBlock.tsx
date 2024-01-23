import React, { useEffect, useState } from "react";

import AnimatedData from "../AnimatedData";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

function NavBlock({ data }: any) {
  const isStart = data.anchor === "start";
  console.log("data", data.navigationType);
  const { anchor } = data;

  return (
    <div id={anchor} className="navBlock double-column-container">
      <div>
        <h2>{data.pitch}</h2>
        {isStart && <AnimatedData />}
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
              <Link href="/ressources/annuaire">Annuaire de spécialistes</Link>
              <Link href="/ressources/exercices">Exercices sexo</Link>
            </>
          )}
          {data.navigationType === "selfLearning" && (
            <>
              <Link href="/ressources/glossaire">Glossaire</Link>
              <Link href="/ressources/medias">
                Médias: livres/BD, podcasts, porno éthique...
              </Link>
              <Link href="/ressources/agenda">Agenda</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default NavBlock;
