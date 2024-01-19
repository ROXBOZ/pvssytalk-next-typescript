import AnimatedData from "./AnimatedData";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import React from "react";
import { urlFor } from "../config/sanity/client";

const Intro = ({ intro }: any) => {
  return (
    <div id="start" className="double-column-container">
      <div>
        <h2>{intro.pitch}</h2>
        {/* {intro.figure && (
          <Image
            className="intro-image"
            src={urlFor(intro.figure.image.asset).url()}
            width={800}
            height={800}
            alt={intro.figure.alt}
          />
        )} */}
        <AnimatedData />
      </div>

      <div className="bigger-text">
        <PortableText value={intro.text as any} />
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
    </div>
  );
};

export default Intro;
