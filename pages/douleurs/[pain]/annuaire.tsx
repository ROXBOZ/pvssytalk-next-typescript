import {
  DirectoryDetail,
  DirectoryDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import Breadcrumbs from "../../../components/Breadcrumbs";
import DirectoryItem from "../../../components/directoryItem";
import { GetStaticPaths } from "next";
import Layout from "../../../components/Layout";
import React from "react";
import ResourcePageLayout from "../../../components/reusables/ResourcePageLayout";
import { client } from "../../../config/sanity/client";
import { directoryCategories } from "../../../components/reusables/Filters";
import { getStaticPathsPain } from "../../../utils/dataFetching";

const Directory = ({
  pain,
  directories,
  headerMenu,
  footerMenu,
}: {
  pain: PainDetail;
  directories: DirectoryDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const relatedDirectoryItem = directories.filter(
    (directoryItem: DirectoryDetail) =>
      directoryItem.isValidated === true &&
      directoryItem.relatedPain?.some((related) => related._ref === pain._id)
  );

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <ResourcePageLayout
        pageName="Annuaire"
        pain={pain}
        relatedContent={relatedDirectoryItem}
      >
        {directoryCategories.map((category) => {
          const categorizedDirectoryItem = relatedDirectoryItem.filter(
            (directoryItem) => directoryItem.category === category.value
          );
          if (categorizedDirectoryItem.length === 0) {
            return null;
          }

          return (
            <div key={category.title} className="directory-container">
              <h2 className="h3">{category.title} </h2>
              {categorizedDirectoryItem.map(
                (directoryItem: DirectoryDetail) => (
                  <DirectoryItem
                    contact={directoryItem}
                    key={directoryItem._id}
                  />
                )
              )}
            </div>
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
    const fetchedDirectories: DirectoryDetails[] | null = await client.fetch(
      `*[_type == "directory" && references($painId)]`,
      { painId: fetchedPain?._id }
    );

    if (!fetchedPain || !fetchedDirectories) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pain: fetchedPain,
        directories: fetchedDirectories,
        headerMenu,
        footerMenu,
      },
    };
  } catch (error) {
    console.error("Error fetching directories:", error);
    return {
      props: { pain: null, directories: [] },
    };
  }
};
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
