import {
  DirectoryDetail,
  DirectoryDetails,
  MenuDetail,
  PainDetail,
  typeformDetail,
} from "../../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import DirectoryLayout from "../../../components/layouts/DirectoryLayout";
import { GetStaticPaths } from "next";
import Layout from "../../../components/layouts/Layout";
import ResourcePageLayout from "../../../components/layouts/ResourcePageLayout";
import { client } from "../../../config/sanity/client";
import { directoryCategories } from "../../../components/reusables/Filters";
import { getStaticPathsPain } from "../../../utils/dataFetching";

const Directory = ({
  pain,
  directory,
  headerMenu,
  footerMenu,
  typeform,
  regions,
  painsSlugs,
  marquee,
}: {
  pain: PainDetail;
  directory: DirectoryDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  typeform: typeformDetail;
  regions: any;
  painsSlugs: any;
  marquee: any;
}) => {
  const relatedDirectoryItem = directory.filter(
    (directoryItem: DirectoryDetail) =>
      directoryItem.relatedPain?.some((related) => {
        return related._id === pain._id;
      })
  );

  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <Layout
      painsSlugs={painsSlugs}
      headerMenu={headerMenu}
      footerMenu={footerMenu}
      marquee={marquee}
    >
      <ResourcePageLayout
        regions={regions[0].regions}
        pageName="Annuaire"
        pain={pain}
        relatedContent={relatedDirectoryItem}
        typeform={typeform}
        selectedPain={selectedPain}
        setSelectedPain={setSelectedPain}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      >
        {directoryCategories.map((category) => {
          const categorizedDirectoryItem = relatedDirectoryItem.filter(
            (directoryItem) => directoryItem.category === category.value
          );

          if (categorizedDirectoryItem.length === 0) {
            return null;
          }

          return (
            <DirectoryLayout
              key={category.value}
              category={category}
              categorizedDirectoryItem={categorizedDirectoryItem}
              selectedPain={selectedPain}
              selectedRegion={selectedRegion}
            />
          );
        })}
      </ResourcePageLayout>
    </Layout>
  );
};

export default Directory;

export const getStaticProps = async ({ params }: any) => {
  try {
    const { pain } = params!;
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const directory: DirectoryDetails = await client.fetch(
      `*[_type == "directory"] {
    ...,
    relatedPain[]->

          ,
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
        }`,
      { painId: fetchedPain?._id }
    );

    const regions: any = await client.fetch(
      `*[_type == "region" && !(_id in path("drafts.**"))]{
          regions[]{
            name
          }
        }`
    );

    if (!fetchedPain || !directory) {
      return {
        notFound: true,
      };
    }

    const typeform: typeformDetail = await client.fetch(`
      *[_type == "typeform" && !(_id in path("drafts.**"))] {
        typeforms[] {
          typeformName,
          typeformLink
        }
      }`);
    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );

    const marquee: any = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))]{marquee}'
    );

    return {
      props: {
        pain: fetchedPain,
        directory,
        headerMenu,
        footerMenu,
        typeform,
        regions,
        painsSlugs,
        marquee,
      },
    };
  } catch (error) {
    return {
      props: { pain: null, directories: [] },
    };
  }
};
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
