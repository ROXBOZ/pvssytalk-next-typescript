import Link from "next/link";
import { MenuDetail } from "../types";
import React from "react";

const Footer = ({ data }: any) => {
  return (
    <footer>
      <div className="footer-content">
        <div>
          <p>
            Let’s 
            <span className="logo">
              pvssy <span className="logo talk">talk</span>
            </span>
             !
          </p>
          <button>s'inscrire à la newsletter</button>
        </div>
        <nav>
          <ul>
            {data &&
              data.map((item: MenuDetail, index: number) => {
                if (item._type === "page") {
                  return (
                    <li key={index}>
                      <Link href={item.slug.current}>{item.title}</Link>
                    </li>
                  );
                }
                if (item._type === "customLink") {
                  if (item.isAction === false) {
                    const isInternal = item.link.includes("pvssy");
                    return (
                      <li key={index}>
                        <Link
                          href={item.link}
                          target={isInternal ? "_self" : "_blank"}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  }
                  if (item.isAction === true) {
                    return (
                      <li key={index}>
                        <Link href={item.link}>
                          <button className="primary-button">
                            {item.title}
                          </button>
                        </Link>
                      </li>
                    );
                  }
                }
                return null;
              })}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
