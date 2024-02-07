import React, { useEffect, useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/layouts/Layout";
import Link from "next/link";
import { MenuDetail } from "../../types";

const Ressources = ({
  headerMenu,
  footerMenu,
}: {
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <div
        className={`double-column-container ${
          currentURL.endsWith("ressources") && "no-border"
        }`}
      >
        <div>
          {currentURL.endsWith("ressources") ? (
            <h1>Ressources supplémentaires</h1>
          ) : (
            <h2>Ressources supplémentaires</h2>
          )}
        </div>
        <div>
          <nav className="nav-directory h4">
            <Link href="ressources/agenda">Agenda</Link>
            <Link href="ressources/annuaire">Annuaire</Link>
            <Link href="ressources/exercices">Exercices</Link>
            <Link href="ressources/glossaire">Glossaire</Link>
            <Link href="ressources/medias">Médias</Link>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default Ressources;

export const getStaticProps = async ({
  params,
}: {
  params: { page: string };
}) => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();

    return {
      props: { headerMenu, footerMenu },
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
};
