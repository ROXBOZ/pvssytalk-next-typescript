import Link from "next/link";
import { PortableText } from "@portabletext/react";
import React from "react";

const Intro = ({ intro }: any) => {
  return (
    <div id="start" className="double-column-container">
      <div>
        <h2>{intro.pitch}</h2>
      </div>
      <div className="bigger-text">
        <PortableText value={intro.text as any} />
      </div>
      <nav className="nav-directory">
        {intro.navigation &&
          intro.navigation.map((page: any, index: number) => {
            return (
              <Link key={index} href={page.slug.current}>
                {page.title}
              </Link>
            );
          })}
      </nav>
    </div>
  );
};

export default Intro;
