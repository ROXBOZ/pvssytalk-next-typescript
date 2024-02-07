import {
  DirectoryDetail,
  DirectoryDetails,
  MenuDetail,
  PainDetail,
  typeformDetail,
} from "../../../types";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import Breadcrumbs from "../../../components/Breadcrumbs";
import DirectoryLayout from "../../../components/layouts/DirectoryLayout";
import { GetStaticPaths } from "next";
import Layout from "../../../components/layouts/Layout";
import React from "react";
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
}: {
  pain: PainDetail;
  directory: DirectoryDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  typeform: typeformDetail;
}) => {
  const relatedDirectoryItem = directory.filter(
    (directoryItem: DirectoryDetail) =>
      directoryItem.relatedPain?.some((related) => {
        return related._id === pain._id;
      })
  );

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <ResourcePageLayout
        pageName="Annuaire"
        pain={pain}
        relatedContent={relatedDirectoryItem}
        typeform={typeform}
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

    return {
      props: {
        pain: fetchedPain,
        directory,
        headerMenu,
        footerMenu,
        typeform,
      },
    };
  } catch (error) {
    return {
      props: { pain: null, directories: [] },
    };
  }
};
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
