import { MenuDetail, PainDetail } from "../types";
import React, { useState } from "react";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useWindowSize from "../utils/useWindowSize";

const RenderMenu = ({ data, pains, setIsOpen }: any) => {
  const [isSelected, setIsSelected] = useState("");

  return (
    <>
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
                                <p className="h3 not-clickable">{menu.title}</p>
                                <p className="bigger-text not-clickable">
                                  {menu.description}
                                </p>
                                <nav>
                                  {menu.pages &&
                                    menu.pages.map(
                                      (page: any, index: number) => (
                                        <Link
                                          key={index}
                                          href={`/${page.slug.current}`}
                                        >
                                          <span className="title">
                                            {page.title}
                                          </span>
                                          <span className="arrow">↗</span>
                                        </Link>
                                      )
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
    </>
  );
};

const MobileMenu = ({ data, pains, setIsOpen }: any) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const expandMenu = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="mobile-menu">
      <Link href="/" className="borderless">
        <span className="logo nowrap">pvssy talk</span>
      </Link>
      <div className="mobile-menu-content">
        {data &&
          data.map((item: any, index: number) => {
            return (
              <div key={index}>
                {item._type &&
                  item._type === "map" &&
                  item.content &&
                  item.content.map((contentItem: any, index: number) => {
                    return (
                      <div key={index}>
                        <div
                          className="title plus"
                          onClick={() => {
                            expandMenu(index);
                          }}
                        >
                          {contentItem._type === "painsMenu" ? (
                            <>
                              <strong>Douleurs</strong>
                              <span className="plus-icon">+</span>
                            </>
                          ) : contentItem._type === "resources" ? (
                            <Link
                              className="title arrow"
                              href={`/ressources/${contentItem.resource
                                .toLowerCase()
                                .replace("é", "e")}`}
                            >
                              {contentItem.resource}
                              <span className="arrow">↗</span>
                            </Link>
                          ) : (
                            <div
                              className="title plus"
                              onClick={() => {
                                expandMenu(index);
                              }}
                            >
                              <strong>{contentItem.title}</strong>
                              <span className="plus-icon">+</span>
                            </div>
                          )}
                        </div>
                        {expandedIndex === index && (
                          <nav>
                            {contentItem.pages &&
                              contentItem.pages.map(
                                (page: any, index: number) => {
                                  return (
                                    <Link
                                      key={index}
                                      href={`/${page.slug.current}`}
                                      onClick={() => {
                                        setIsOpen(false);
                                      }}
                                    >
                                      <span>{page.title}</span>
                                    </Link>
                                  );
                                }
                              )}
                          </nav>
                        )}

                        {contentItem._type === "painsMenu" &&
                          expandedIndex === index && (
                            <nav>
                              {pains &&
                                pains.map((pain: PainDetail, index: number) => {
                                  return (
                                    <Link key={index} href={pain.slug.current}>
                                      {pain.name}
                                    </Link>
                                  );
                                })}
                            </nav>
                          )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const Header = ({ data, pains }: any) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const is600Max = useWindowSize();

  return (
    <header
      className={`header ${isOpen ? "fixed" : ""} ${
        is600Max ? "relative" : ""
      }`}
    >
      <Link href="/" className="borderless">
        <span className="logo nowrap">pvssy talk</span>
      </Link>

      {is600Max && mobileMenuIsOpen && (
        <MobileMenu
          data={data}
          pains={pains}
          is600Max={is600Max}
          setIsOpen={setIsOpen}
        />
      )}

      <nav className="header-nav">
        {is600Max && (
          <FontAwesomeIcon
            onClick={() => {
              setMobileMenuIsOpen(!mobileMenuIsOpen);
            }}
            className={`burger-icon ${mobileMenuIsOpen ? "fixed" : ""}`}
            icon={mobileMenuIsOpen ? faClose : faBars}
          />
        )}
        <RenderMenu data={data} pains={pains} setIsOpen={setIsOpen} />
      </nav>
    </header>
  );
};

export default Header;
