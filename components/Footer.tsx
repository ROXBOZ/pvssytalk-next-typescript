import { MenuDetail } from "../types";
import React from "react";
import { getFooterData } from "../utils/dataFetching";

const Footer = ({ footerMenu }: MenuDetail) => {
  console.log("footerMenu", footerMenu);

  const handleNewsletter = () => {
    console.log("s'inscrire à la newsletter");
  };
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
          <button onClick={handleNewsletter}>s'inscrire à la newsletter</button>
        </div>
        <nav>
          <ul></ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

export const getStaticProps = async () => {
  const footerMenu = await getFooterData();
  return {
    props: { footerMenu },
  };
};
