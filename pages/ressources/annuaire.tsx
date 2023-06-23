import React from "react";
import { GetStaticProps } from "next";
import { DirectoryDetail } from "../../types";
import { directoryCategories } from "../../components/reusables/Filters";
import DirectoryItem from "../../components/directoryItem";
import { getStaticPropsDirectory } from "../../props/dataFetching";
import RessourceNav from "../../components/ressourceNav";

const Directory = ({ directory }: { directory: DirectoryDetail[] }) => {
  return (
    <div>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>
              Annuaire <sup>{directory.length}</sup>
            </h1>
            <RessourceNav />
          </div>
          <div>
            {directoryCategories.map((category) => {
              if (typeof category === "string") {
                return null;
              }

              const categorizedDirectoryItem = directory.filter(
                (directoryItem) => directoryItem.category === category.value
              );

              if (categorizedDirectoryItem.length === 0) {
                return null;
              }

              return (
                <div key={category.value} className="directory-container">
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
export const getStaticProps: GetStaticProps = getStaticPropsDirectory;
