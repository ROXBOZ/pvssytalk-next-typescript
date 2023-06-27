import React from "react";
import PainNav from "../../../components/painNav";
import { DirectoryDetail, PainDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import DirectoryItem from "../../../components/directoryItem";
import {
  getStaticPathsPain,
  getStaticPropsPainDirectories,
} from "../../../props/dataFetching";
import { directoryCategories } from "../../../components/reusables/Filters";

const Directory = ({
  pain,
  directories,
}: {
  pain: PainDetail;
  directories: DirectoryDetail[];
}) => {
  console.log("directories :", directories);
  const relatedDirectoryItem = directories.filter(
    (directoryItem: DirectoryDetail) =>
      directoryItem.relatedPain?.some((related) => related._ref === pain._id)
  );

  return (
    <div>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>
              Annuaire{" "}
              <a href="./" className="colored logo">
                {pain.name}
              </a>{" "}
              <sup className="no-color">{directories.length}</sup>
            </h1>
            <PainNav pain={pain} />
          </div>
          <div>
            {directoryCategories.map((category) => {
              const categorizedDirectoryItem = relatedDirectoryItem.filter(
                (directoryItem) => directoryItem.category === category.value
              );

              if (categorizedDirectoryItem.length === 0) {
                return null;
              }

              return (
                <div key={category.title} className="directory-container">
                  <h2 className="h3">
                    {category.title}{" "}
                    <sup>{categorizedDirectoryItem.length}</sup>
                  </h2>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
export const getStaticProps: GetStaticProps = getStaticPropsPainDirectories;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
