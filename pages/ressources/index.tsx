import { MenuDetail, PainDetail } from "../../types";
import React, { useEffect, useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Layout from "../../components/layouts/Layout";
import Link from "next/link";
import { client } from "../../config/sanity/client";

const Ressources = ({
  headerMenu,
  footerMenu,
  painsSlugs,
  marquee,
}: {
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  painsSlugs: any;
  marquee: any;
}) => {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <Layout
      headerMenu={headerMenu}
      footerMenu={footerMenu}
      painsSlugs={painsSlugs}
      marquee={marquee}
    >
      <div
        className={`double-column-container ${
          currentURL.endsWith("ressources") && "no-border"
        }`}
      >
        <div>
          {currentURL.endsWith("ressources") ? (
            <h1>Ressources</h1>
          ) : (
            <h2>Ressources</h2>
          )}
        </div>
        <div>
          <nav className="nav-directory h4">
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

    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );

    const marquee: any = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))]{marquee}'
    );

    return {
      props: { headerMenu, footerMenu, painsSlugs, marquee },
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
};
