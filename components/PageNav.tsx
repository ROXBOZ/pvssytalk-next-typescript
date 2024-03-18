import React, { useEffect, useState } from "react";

import { HeadingProps } from "react-markdown/lib/ast-to-react";
import Link from "next/link";
import useWindowSize from "../utils/useWindowSize";

const PageNav = ({ pages }: { pages: any }) => {
  const is600Max = useWindowSize();

  return (
    <nav className={`nav-directory ${!is600Max && "h4"}`}>
      {pages &&
        pages.map((page: any, index: number) => {
          if (page.isArticle === true) {
            return (
              <Link href={page.slug.current} key={index}>
                <span>{page.title}</span>
              </Link>
            );
          }
          return null;
        })}
    </nav>
  );
};

export default PageNav;
