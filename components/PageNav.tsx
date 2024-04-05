import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../utils/useWindowSize";

const PageNav = ({ headerMenu }: { headerMenu: any }) => {
  const is600Max = useWindowSize();
  const fooMenu = headerMenu[0]?.headerMenu[0]?.content[0]?.pages;
  const fooMenuIsValid =
    "231c35637a06" === headerMenu[0]?.headerMenu[0]?.content[0]?._key;
  const fooMenuTitle = headerMenu[0]?.headerMenu[0]?.content[0]?.title;
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  useEffect(() => {
    setCurrentPath(window.location.pathname.substring(1));
  }, [router]);

  const showMenu =
    fooMenu &&
    fooMenu.some((page: any) => {
      return page.slug.current.includes(currentPath);
    });

  return (
    <>
      {showMenu && (
        <nav className={`page-nav nav-directory`}>
          <h3>{fooMenuTitle}</h3>
          {fooMenuIsValid &&
            fooMenu &&
            fooMenu.map((page: any, index: number) => (
              <Link
                className="h4"
                style={{ margin: "0" }}
                href={page.slug.current}
                key={index}
              >
                <span>{page.title}</span>
              </Link>
            ))}
        </nav>
      )}
    </>
  );
};

export default PageNav;
