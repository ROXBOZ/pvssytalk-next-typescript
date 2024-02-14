import { AgendaDetail, MenuDetail, typeformDetail } from "../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import AgendaLayout from "../../components/layouts/AgendaLayout";
import CustomHead from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import ResourcePageLayout from "../../components/layouts/ResourcePageLayout";
import { client } from "../../config/sanity/client";

const Agenda = ({
  agenda,
  headerMenu,
  footerMenu,
  seo,
  regions,
  typeform,
}: {
  agenda: AgendaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  regions: any;
  seo: any;
  typeform: any;
}) => {
  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <>
      <CustomHead seo={seo[0].agenda} />
      <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
        <ResourcePageLayout
          pageName="Agenda"
          relatedContent={agenda}
          typeform={typeform}
          regions={regions[0].regions}
          selectedPain={selectedPain}
          setSelectedPain={setSelectedPain}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        >
          {agenda.map((event: AgendaDetail, index: number) => {
            return (
              <AgendaLayout
                event={event}
                key={index}
                selectedPain={selectedPain}
                selectedRegion={selectedRegion}
              />
            );
          })}
        </ResourcePageLayout>
      </Layout>
    </>
  );
};

export default Agenda;
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const event: AgendaDetail[] = await client.fetch(
      `*[_type == "event" && !(_id in path("drafts.**"))] {
        ...,
        relatedPain[]->{name}
      }`
    );
    const seo: any = await client.fetch(
      '*[_type == "seoManager" && !(_id in path("drafts.**"))]'
    );

    const typeform: typeformDetail = await client.fetch(`
      *[_type == "typeform" && !(_id in path("drafts.**"))]`);

    const regions: any = await client.fetch(
      `*[_type == "region" && !(_id in path("drafts.**"))]{
          regions[]{
            name
          }
        }`
    );
    return {
      props: { headerMenu, footerMenu, agenda: event, seo, regions, typeform },
    };
  } catch (error) {
    console.error("Error fetching agenda:", error);
  }
};
