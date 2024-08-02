import Link from "next/link";
import { MenuDetail } from "../types";
import React from "react";

const Footer = ({ data }: any) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-content">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="lets">
            <Link href={"mailto:hello@pvssy-talk.org"}>
              Let’s pvssy <span>talk</span>
            </Link>
            <p>
              N’hésite pas à nous laisser un message, un retour ou nous proposer
              une collaboration.
            </p>
          </div>

          <div className="lets">
            <Link href="https://pvssy-talk.us13.list-manage.com/subscribe?u=c202f1a11b2efe147dfbb7c77&id=ad8e7a08e3">
              Inscris-toi à notre <span>newsletter</span>
            </Link>
            <p>
              Pour suivre notre actualité et nos projets ou évènements à venir.
            </p>
          </div>
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
      <span
        style={{
          fontSize: "smaller",
        }}
      >
        © {currentYear}, <span className="logo">pvssy talk</span>.
      </span>
    </footer>
  );
};

export default Footer;
