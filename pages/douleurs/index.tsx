import { MenuDetail, PainDetail } from "../../types";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Layout from "../../components/layouts/Layout";
import PainGrid from "../../components/PainGrid";
import React from "react";
import { client } from "../../config/sanity/client";

const Pains = ({
  pains,
  headerMenu,
  footerMenu,
  marquee,
}: {
  pains: PainDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  marquee: any;
}) => {
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu} marquee={marquee}>
      <PainGrid pains={pains} />
    </Layout>
  );
};

export default Pains;

export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {..., filters}'
    );
    const marquee: any = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))]{marquee}'
    );
    return {
      props: { pains, headerMenu, footerMenu, marquee },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
