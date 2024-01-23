// import { Link } from "react-scroll";
import Link from "next/link";
import { MenuDetail } from "../types";
import React from "react";

const Header = ({ data }: any) => {
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
                <Link key={index} href={item.slug.current}>
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
              if (item.isAction === true) {
                return (
                  <Link key={index} href={item.link}>
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
