import React, { useState } from "react";
import { GetStaticProps } from "next";
import { DirectoryDetail } from "../../types";
import Filters, {
  directoryCategories,
  pains,
} from "../../components/reusables/Filters";
import DirectoryItem from "../../components/directoryItem";
import { getStaticPropsDirectory } from "../../utils/dataFetching";
import RessourceNav from "../../components/ressourceNav";

const Directory = ({ directory }: { directory: DirectoryDetail[] }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  return (
    <div>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
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

              const categorizedDirectoryItem = directory.filter(
                (directoryItem) => directoryItem.category === category.value
              );

              if (categorizedDirectoryItem.length === 0) {
                return null;
              }

              return (
                <div key={category.value} className="directory-container">
                  <h2 className="h3">{category.title}</h2>
                  {categorizedDirectoryItem
                    .filter(
                      (directoryItem: DirectoryDetail) =>
                        directoryItem.isValidated === true
                    )
                    .map((directoryItem: DirectoryDetail) => (
                      <DirectoryItem
                        contact={directoryItem}
                        key={directoryItem._id}
                      />
                    ))}
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
