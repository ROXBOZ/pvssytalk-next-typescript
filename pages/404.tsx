import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Link from "next/link";
import { MenuDetail } from "../types";
import { client } from "../config/sanity/client";
import { useRouter } from "next/router";

function Custom404({
  headerMenu,
  footerMenu,
}: {
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(redirectTimer);
      router.replace("/");
    }

    return () => clearInterval(redirectTimer);
  }, [countdown, router]);

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <div className="error-page-container">
        <div className="error-page-content">
          <h1>Erreur 404</h1>
          <p className="bigger-text">
            La page recherchée n’existe pas ou plus. Si tu penses qu’il s’agit
            d'une erreur, tu peux nous contacter à{" "}
            <a href="mailto:info@pvssy-talk.org">info@pvssy-talk.org</a>.
          </p>
          <p>
            Redirection automatique dans {countdown}{" "}
            {countdown === 1 ? "seconde" : "secondes"}.
          </p>
          <Link href="/" style={{ border: 0 }}>
            <button className="secondary-button">retour à l’accueil</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Custom404;

export const getStaticProps = async ({
  params,
}: {
  params: { page: string };
}) => {
  try {
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const footerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );

    return {
      props: { headerMenu, footerMenu },
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
};
