import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          Let’s <span className="logo">pvssy talk</span> !
        </p>
        <nav>
          <ul>
            <li>
              <Link
                href="https://drive.google.com/drive/folders/1l47TaPu9BNp-Qya2Ips7ovipUBmAejqu"
                rel="noopener noreferrer"
                target="_blank"
              >
                presskit
              </Link>
            </li>
            <li>
              <Link className="acronym" href="conditions-generales">
                CGUV
              </Link>
            </li>
            <li>
              <Link href="accessibilite">accessibilité</Link>
            </li>
            <li>
              <Link href="credits">crédits</Link>
            </li>

            <li>
              <Link href="mailto:hello@pvssy-talk.org">email</Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/pvssytalk/"
              >
                facebook
                <span className="screen-reader-text">
                  (ouvre un nouvel onglet)
                </span>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/pvssy_talk/"
              >
                instagram
                <span className="screen-reader-text">
                  (ouvre un nouvel onglet)
                </span>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/pvssy-talk/"
              >
                linkedIn
                <span className="screen-reader-text">
                  (ouvre un nouvel onglet)
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
