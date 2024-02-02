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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/Layout";
import Link from "next/link";
import RessourceNav from "../../components/ressourceNav";
import { client } from "../../config/sanity/client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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

  const allPains = pains.slice(1);
  const allRegions = cantons.slice(1);

  const DropDown = ({ title, array }: any) => {
    return (
      <div className="dropdown">
        <span className="drowpdown-title">
          {title}
          <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </span>
        <div className="dropdown-content">
          <ul>
            {array.map((item: any) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div className="fixed-container">
            <div className="title">
              <h1>
                Annuaire{" "}
                <sup>
                  {directory.filter((item) => item.isValidated === true).length}
                </sup>
              </h1>
              {typeformDirectoryLink && (
                <Link
                  target="_blank"
                  style={{ border: 0 }}
                  href={typeformDirectoryLink}
                >
                  <button className="primary-button">
                    faire une recommendation
                  </button>
                </Link>
              )}
            </div>
            <RessourceNav />
            {/* <span>
              Filtre: Syndrome des ovaires polykystiques, France voisine
            </span> */}
            <div className="dropdowns-container">
              <DropDown title="Douleurs" array={allPains} />
              <DropDown title="Régions" array={allRegions} />
            </div>
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
