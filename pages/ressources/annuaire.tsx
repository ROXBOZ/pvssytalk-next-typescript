import {
  DirectoryDetail,
  DirectoryDetails,
  MenuDetail,
  typeformDetail,
} from "../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Breadcrumbs from "../../components/Breadcrumbs";
import DirectoryLayout from "../../components/layouts/DirectoryLayout";
import Layout from "../../components/Layout";
import ResourcePageLayout from "../../components/layouts/ResourcePageLayout";
import { client } from "../../config/sanity/client";
import { directoryCategories } from "../../components/reusables/Filters";

const Directory = ({
  directory,
  headerMenu,
  footerMenu,
  typeform,
  regions,
}: {
  directory: DirectoryDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  typeform: any;
  regions: any;
}) => {
  {
    /* FIXME  */
  }
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

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <ResourcePageLayout
        pageName="Annuaire"
        relatedContent={directory}
        typeform={typeform}
        regions={regions[0].regions}
      >
        {directoryCategories.map((category) => {
          if (typeof category === "string") {
            return null;
          }

          const categorizedDirectoryItem = filteredDirectoryItems.filter(
            (directoryItem) => directoryItem.category === category.value
          );

          return (
            <DirectoryLayout
              regions={regions}
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
      *[_type == "typeform" && !(_id in path("drafts.**"))] {
        typeforms[] {
          typeformName,
          typeformLink
        }
      }`);

    return {
      props: {
        directory: sortedDirectory,
        headerMenu,
        footerMenu,
        typeform,
        regions,
      },
    };
  } catch (error) {
    console.error("Error fetching directory:", error);
    return {
      props: { directory: [] },
    };
  }
};
