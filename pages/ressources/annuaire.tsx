import {
  DirectoryDetail,
  DirectoryDetails,
  MenuDetail,
  PainDetail,
  typeformDetail,
} from "../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import CustomHead from "../../components/CustomHead";
import DirectoryLayout from "../../components/layouts/DirectoryLayout";
import Layout from "../../components/layouts/Layout";
import ResourcePageLayout from "../../components/layouts/ResourcePageLayout";
import { client } from "../../config/sanity/client";
import { directoryCategories } from "../../components/reusables/Filters";

const Directory = ({
  directory,
  headerMenu,
  footerMenu,
  typeform,
  regions,
  seo,
  painsSlugs,
  marquee,
}: {
  directory: DirectoryDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  typeform: any;
  regions: any;
  seo: any;
  painsSlugs: any;
  marquee: any;
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredDirectoryItems = directory.filter((directoryItem) => {
    return (
      !selectedFilter ||
      (directoryItem.relatedPain &&
        directoryItem.relatedPain.some(
          (pain: any) =>
            pain.name.toLowerCase() === selectedFilter.toLowerCase()
        ))
    );
  });

  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <>
      <CustomHead seo={seo[0].directory} />
      <Layout
        painsSlugs={painsSlugs}
        headerMenu={headerMenu}
        footerMenu={footerMenu}
        marquee={marquee}
      >
        <ResourcePageLayout
          pageName="Annuaire"
          relatedContent={directory}
          typeform={typeform}
          regions={regions[0].regions}
          selectedPain={selectedPain}
          setSelectedPain={setSelectedPain}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        >
          {directoryCategories.map((category, index) => {
            if (typeof category === "string") {
              return null;
            }

            const categorizedDirectoryItem = filteredDirectoryItems.filter(
              (directoryItem) => directoryItem.category === category.value
            );

            return (
              <DirectoryLayout
                key={`${category.value}_${index}`}
                regions={regions}
                category={category}
                categorizedDirectoryItem={categorizedDirectoryItem}
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

export default Directory;
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const directory: DirectoryDetails = await client.fetch(`
      *[_type == "directory" && !(_id in path("drafts.**"))]{
        ...,
        relatedPain[]->{
          name
        },
        recommendations[]->{
          name
        },
        addresses[]{
          ...,
          accessibility[]->{
           name
          },
        },

        profession->{name}
      }
    `);

    const regions: any = await client.fetch(
      `*[_type == "region" && !(_id in path("drafts.**"))]{
          regions[]{
            name
          }
        }`
    );

    const sortedDirectory = directory.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const typeform: typeformDetail = await client.fetch(`
      *[_type == "typeform" && !(_id in path("drafts.**"))]`);

    const seo: any = await client.fetch(
      '*[_type == "seoManager" && !(_id in path("drafts.**"))]'
    );
    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );

    const marquee: any = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))]{marquee}'
    );
    return {
      props: {
        directory: sortedDirectory,
        headerMenu,
        footerMenu,
        typeform,
        regions,
        seo,
        painsSlugs,
        marquee,
      },
    };
  } catch (error) {
    console.error("Error fetching directory:", error);
    return {
      props: { directory: [] },
    };
  }
};
