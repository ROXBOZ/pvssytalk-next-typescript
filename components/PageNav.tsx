import Link from "next/link";
import React from "react";
import useWindowSize from "../utils/useWindowSize";

const PageNav = ({ headerMenu }: { headerMenu: any }) => {
  const is600Max = useWindowSize();
  const fooMenu = headerMenu[0]?.headerMenu[0]?.content[0]?.pages;
  const fooMenuIsValid =
    "231c35637a06" === headerMenu[0]?.headerMenu[0]?.content[0]?._key;

  const fooMenuTitle = headerMenu[0]?.headerMenu[0]?.content[0]?.title;

  return (
    <>
      {!is600Max && (
        <nav className={`nav-directory`}>
          <h3>{fooMenuTitle}</h3>
          {fooMenuIsValid &&
            fooMenu &&
            fooMenu.map((page: any, index: number) => (
              <Link href={page.slug.current} key={index}>
                <span>{page.title}</span>
              </Link>
            ))}
        </nav>
      )}
    </>
  );
};

export default PageNav;
