import React, { useEffect, useState } from "react";

import Link from "next/link";
import { MenuDetail } from "../types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/router";

const Header = ({ data, pains }: any) => {
  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === "/";
  const isDirectory = pathname === "/ressources/annuaire";
  const [isSelected, setIsSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   gsap
  //     .timeline()
  //     .fromTo(
  //       ".animate-wrapper",
  //       { y: "-100%" },
  //       {
  //         y: "0%",
  //         ease: "power2.out",
  //       }
  //     )
  //     .fromTo(
  //       ".animate-content",
  //       { opacity: 0 },
  //       {
  //         opacity: 1,
  //         stagger: 0.1,
  //       }
  //     );
  // }, [isSelected, isOpen]);

  return (
    <header className={`${isOpen ? "fixed" : "not-fixed"}`}>
      <Link href="/" className="borderless">
        <span className="logo nowrap">pvssy talk</span>
      </Link>
      <nav className="header-nav">
        {data &&
          data.map((item: MenuDetail, index: number) => {
            if (item._type === "page") {
              return (
                <Link
                  className="page-link"
                  key={index}
                  href={`/${item.slug.current}`}
                  onClick={() => {
                    setIsSelected("");
                    setIsOpen(false);
                  }}
                >
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

              if (
                item.isAction === true &&
                isHome === false &&
                isDirectory === false
              ) {
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
            if (item._type === "map") {
              return (
                <div
                  className="dropdown"
                  key={index}
                  tabIndex={0}
                  onClick={() => {
                    setIsSelected(item.title);
                    setIsOpen(true);
                  }}
                >
                  <span
                    className={`nav-title ${
                      isSelected === item.title ? "selected" : "not-selected"
                    }`}
                  >
                    {item.title}
                  </span>
                  <div
                    className={`animate-wrapper dropdown-content-wrapper ${
                      isSelected === item.title ? "selected" : "not-selected"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSelected("");
                      setIsOpen(false);
                    }}
                  >
                    <div className="animate-content dropdown-content">
                      <div className="contenu">
                        {item.content &&
                          item.content.map((menu: any, index: number) => {
                            if (menu._type === "pagesMenu") {
                              return (
                                <div className="col" key={index}>
                                  <p className="h3 not-clickable">
                                    {menu.title}
                                  </p>
                                  <p className="bigger-text not-clickable">
                                    {menu.description}
                                  </p>
                                  <nav>
                                    {menu.pages &&
                                      menu.pages.map(
                                        (page: any, index: number) => {
                                          return (
                                            <Link
                                              key={index}
                                              href={`/${page.slug.current}`}
                                            >
                                              <span className="title">
                                                {page.title}
                                              </span>
                                              <span className="arrow">↗</span>
                                            </Link>
                                          );
                                        }
                                      )}
                                  </nav>
                                </div>
                              );
                            }
                            if (menu._type === "painsMenu") {
                              return (
                                <div className="col" key={index}>
                                  <p className="h3 not-clickable">Douleurs</p>
                                  <p className="bigger-text not-clickable">
                                    {menu.description}
                                  </p>
                                  <nav>
                                    {pains &&
                                      pains
                                        .slice()
                                        .sort((a: any, b: any) =>
                                          a.name.localeCompare(b.name)
                                        )
                                        .map((pain: any, index: number) => (
                                          <Link
                                            key={index}
                                            href={`/douleurs/${pain.slug.current}`}
                                          >
                                            <span className="title">
                                              {pain.name}
                                            </span>
                                            <span className="arrow">↗</span>
                                          </Link>
                                        ))}
                                  </nav>
                                </div>
                              );
                            }
                            if (menu._type === "resources") {
                              return (
                                <div className="col" key={index}>
                                  <Link
                                    className="link-resource"
                                    href={`/ressources/${menu.resource
                                      .toLowerCase()
                                      .replace("é", "e")}`}
                                  >
                                    <div className="resource">
                                      <p className="h3">{menu.resource}</p>
                                      <span className="h3 arrow">↗</span>
                                    </div>

                                    <p className="bigger-text">
                                      {menu.description}
                                    </p>
                                  </Link>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
      </nav>
    </header>
  );
};

export default Header;
