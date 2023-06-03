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
          <a
            href="https://drive.google.com/drive/folders/1l47TaPu9BNp-Qya2Ips7ovipUBmAejqu"
            rel="noopener noreferrer"
            target="_blank"
          >
            presskit
          </a>
          <Link className="acronym" href="conditions-generales">
            CGUV
          </Link>
          <Link href="accessibilite">accessibilité</Link>
          <Link href="credits">crédits</Link>

          <a href="mailto:hello@pvssy-talk.org">email</a>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/pvssytalk/"
          >
            facebook
            <span className="screen-reader-text">(ouvre un nouvel onglet)</span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/pvssy_talk/"
          >
            instagram
            <span className="screen-reader-text">(ouvre un nouvel onglet)</span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/pvssy-talk/"
          >
            linkedIn
            <span className="screen-reader-text">(ouvre un nouvel onglet)</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
