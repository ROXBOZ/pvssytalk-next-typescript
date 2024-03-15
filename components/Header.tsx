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
  const expandMenu = (index: any) => {
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
              <>
                {item._type === "page" && (
                  <div className="title plus">
                    <Link key={index} href={item.slug.current}>
                      <span>{item.title}</span>
                      <span className="arrow">→</span>
                    </Link>
                  </div>
                )}
                {item._type &&
                  item._type === "map" &&
                  item.content &&
                  item.content.map((contentItem: any, index: number) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="title plus"
                          onClick={() => {
                            expandMenu(contentItem._key);
                          }}
                        >
                          {contentItem._type === "painsMenu" ? (
                            <span>Douleurs</span>
                          ) : contentItem._type === "resources" ? (
                            <Link
                              href={`/ressources/${contentItem.resource
                                .toLowerCase()
                                .replace("é", "e")}`}
                            >
                              <span>{contentItem.resource}</span>
                              <span className="arrow">↗</span>
                            </Link>
                          ) : (
                            <span>{contentItem.title}</span>
                          )}
                          {contentItem._type !== "resources" && (
                            <>
                              {expandedIndex !== contentItem._key ? (
                                <span className="plus-icon">+</span>
                              ) : (
                                <span className="minus-icon">-</span>
                              )}
                            </>
                          )}
                        </div>
                        {expandedIndex === contentItem._key && (
                          <nav className="mobile-nav-content">
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
                          expandedIndex === contentItem._key && (
                            <nav className="mobile-nav-content">
                              {pains &&
                                pains.map((pain: PainDetail, index: number) => {
                                  return (
                                    <Link
                                      key={index}
                                      href={`/douleurs/${pain.slug.current}`}
                                    >
                                      {pain.name ===
                                      "Syndrome des ovaires polykystiques"
                                        ? "SOPK"
                                        : pain.name}
                                    </Link>
                                  );
                                })}
                            </nav>
                          )}
                      </>
                    );
                  })}
              </>
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
