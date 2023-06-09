import React from "react";
import CookieConsent from "react-cookie-consent";

type Props = {};

const CookieBanner = (props: Props) => {
  return (
    <>
      {/* <CookieConsent
        expires={14}
        buttonText="J’accepte"
        style={{ backgroundColor: "#c8ffa5", color: "#4d4d28" }}
        buttonStyle={{
          backgroundColor: "#4d4d28",
          border: "1px solid #4d4d28",
          color: "#fefdf4",
          borderRadius: ".25em",
        }}
      >
        <span className="logo">pvssy talk</span> utilise des cookies dans le but
        d’améliorer l’expérience de ses utilisateurices.
      </CookieConsent> */}
    </>
  );
};

export default CookieBanner;
