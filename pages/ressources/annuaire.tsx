import {
  DirectoryDetail,
  DirectoryDetails,
  MenuDetail,
  typeformDetail,
} from "../../types";
import Filters, {
  cantons,
  directoryCategories,
  pains,
} from "../../components/reusables/Filters";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Breadcrumbs from "../../components/Breadcrumbs";
import DirectoryItem from "../../components/directoryItem";
import Layout from "../../components/Layout";
import Link from "next/link";
import RessourceNav from "../../components/ressourceNav";
import { client } from "../../config/sanity/client";

const Directory = ({
  directory,
  headerMenu,
  footerMenu,
  typeform,
}: {
  directory: DirectoryDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  typeform: any;
}) => {
  const typeformDirectoryLink =
    Array.isArray(typeform[0]?.typeforms) &&
    typeform[0].typeforms.find(
      (typeform: any) => typeform.typeformName === "Annuaire"
    )?.typeformLink;

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

  console.log("directory", directory);
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
                {typeformDirectoryLink && (
                  <Link
                    target="_blank"
                    style={{ border: 0 }}
                    href={typeformDirectoryLink}
                  >
                    <button>faire une recommendation</button>
                  </Link>
                )}
              </sup>
            </h1>
            <RessourceNav />

            <Filters
              filterOptions={pains}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <br />
            <br />
            <Filters
              filterOptions={cantons}
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
                (directoryItem) => directoryItem.category === category.value
              );

              if (selectedFilter && categorizedDirectoryItem.length === 0) {
                return (
                  <div key={category.value} className="directory-container">
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
                  <h2 className="h3 category-title">{category.title}</h2>
                  {categorizedDirectoryItem.map(
                    (directoryItem: DirectoryDetail, index: number) => {
                      if (directoryItem.isValidated === true) {
                        return (
                          <DirectoryItem contact={directoryItem} key={index} />
                        );
                      }
                    }
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
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const directory: DirectoryDetails = await client.fetch(`
      *[_type == "directory" && !(_id in path("drafts.**"))]{
        ...,
        relatedPain[]->{
          name
        },
        tags[]->{
          name
        },
        profession->{name}
      }
    `);

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
      props: { directory: sortedDirectory, headerMenu, footerMenu, typeform },
    };
  } catch (error) {
    console.error("Error fetching directory:", error);
    return {
      props: { directory: [] },
    };
  }
};
