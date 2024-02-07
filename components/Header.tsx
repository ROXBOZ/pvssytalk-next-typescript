import React, { useState } from "react";

import Link from "next/link";
import { MenuDetail } from "../types";
import { useRouter } from "next/router";

const LinkBlock = ({ index, slug, description, title }: any) => (
  <Link href={slug} key={index} className="link-block">
    <span className="title h4">
      {title}
      <span className="arrow">↗</span>
    </span>
    <p>{description}</p>
  </Link>
);

const Header = ({ data, pains }: any) => {
  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === "/";
  const isDirectory = pathname === "/ressources/annuaire";

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
                <div className="dropdown" key={index}>
                  <span>{item.title}</span>

                  <div className="dropdown-content-wrapper">
                    <div className="dropdown-content">
                      {item.type?.[0] === "Pages" && (
                        <div className="blocks-container">
                          {item.pages &&
                            item.pages.map((page: any, index: number) => (
                              <LinkBlock
                                index={index}
                                slug={page.slug.current}
                                title={page.title}
                                description={page.description}
                              />
                            ))}
                        </div>
                      )}
                      {item.type?.[0] === "Douleurs" && (
                        <div className="blocks-container">
                          {pains && (
                            <div className="blocks-container">
                              {pains &&
                                pains.map((pain: any, index: number) => (
                                  <LinkBlock
                                    index={index}
                                    slug={pain.slug.current}
                                    title={pain.name}
                                    description={pain.description}
                                  />
                                ))}
                            </div>
                          )}
                        </div>
                      )}
                      {item.type?.[0] === "Ressources" && (
                        <div className="blocks-container-wrapper">
                          <div className="blocks-container">
                            <LinkBlock
                              index={index}
                              slug="/ressources/annuaire"
                              title="Annuaire"
                              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                            />
                            <LinkBlock
                              index={index}
                              slug="/ressources/exercices"
                              title="Exercices"
                              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                            />
                          </div>

                          <div className="blocks-container">
                            <LinkBlock
                              index={index}
                              slug="/ressources/glossaire"
                              title="Glossaire"
                              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                            />
                            <LinkBlock
                              index={index}
                              slug="/ressources/medias"
                              title="Médias"
                              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                            />
                          </div>
                        </div>
                      )}
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
