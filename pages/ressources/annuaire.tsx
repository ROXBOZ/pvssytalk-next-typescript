import { DirectoryDetail, DirectoryDetails, MenuDetail } from "../../types";
import Filters, {
  directoryCategories,
  pains,
} from "../../components/reusables/Filters";
import React, { useState } from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
import DirectoryItem from "../../components/directoryItem";
import Layout from "../../components/Layout";
import RessourceNav from "../../components/ressourceNav";
import { client } from "../../config/sanity/client";

const Directory = ({
  directory,
  headerMenu,
  footerMenu,
}: {
  directory: DirectoryDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
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

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div className="fixed-container">
            <h1>
              Annuaire{" "}
              <sup>
                {directory.filter((item) => item.isValidated === true).length}
              </sup>
            </h1>
            <RessourceNav />
            <Filters
              filterOptions={pains}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
          <div>
            {directoryCategories.map((category) => {
              if (typeof category === "string") {
                return null;
              }

              const categorizedDirectoryItem = filteredDirectoryItems.filter(
                (mediaItem) => mediaItem.category === category.value
              );

              if (selectedFilter && categorizedDirectoryItem.length === 0) {
                return (
                  <div key={category.value} className="media-container">
                    <h2 className="h3">{category.title}</h2>
                    <div className="msg-box">
                      <p className="msg info">
                        Tu as une recommendation? Contacte-nous!
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={category.value} className="directory-container">
                  <h2 className="h3">{category.title}</h2>
                  {categorizedDirectoryItem.map(
                    (directoryItem: DirectoryDetail, index: number) => (
                      <DirectoryItem contact={directoryItem} key={index} />
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Directory;
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const footerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const directory: DirectoryDetails = await client.fetch(`
      *[_type == "directory" && !(_id in path("drafts.**"))]{
        ...,
        relatedPain[]->{
          name
        }
      }
    `);

    const sortedDirectory = directory.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return {
      props: { directory: sortedDirectory, headerMenu, footerMenu },
    };
  } catch (error) {
    console.error("Error fetching directory:", error);
    return {
      props: { directory: [] },
    };
  }
};
