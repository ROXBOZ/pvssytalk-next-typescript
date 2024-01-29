// import { Link } from "react-scroll";
import Link from "next/link";
import { MenuDetail } from "../types";
import React from "react";
import { useRouter } from "next/router";

const Header = ({ data }: any) => {
  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === "/";
  return (
    <header>
      <Link href="/" className="borderless">
        <span className="logo nowrap">
          pvssy talk <sup>1.0</sup>
        </span>
      </Link>
      <nav>
        {data &&
          data.map((item: MenuDetail, index: number) => {
            if (item._type === "page") {
              return (
                <Link key={index} href={`/${item.slug.current}`}>
                  {item.title}
                </Link>
              );
            }
            if (item._type === "customLink") {
              const isInternal =
                item.link.includes("pvssy") || item.link.includes("/#");

              if (item.isAction === false) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target={isInternal ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </Link>
                );
              }
              if (item.isAction === true && isHome === false) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target={isInternal ? "_self" : "_blank"}
                  >
                    <button className="primary-button"> {item.title}</button>
                  </Link>
                );
              }
            }
            return null;
          })}
      </nav>
    </header>
  );
};

export default Header;
