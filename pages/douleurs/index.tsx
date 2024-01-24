import { MenuDetail, PainDetail } from "../../types";

import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import PainGrid from "../../components/PainGrid";
import React from "react";
import { client } from "../../config/sanity/client";

const Pains = ({
  pains,
  headerMenu,
  footerMenu,
}: {
  pains: PainDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <PainGrid pains={pains} />
    </Layout>
  );
};

export default Pains;

export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const footerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {..., filters}'
    );
    return {
      props: { pains, headerMenu, footerMenu },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
