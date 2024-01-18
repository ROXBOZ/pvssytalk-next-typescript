import { DirectoryDetail, PainDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  getStaticPathsPain,
  getStaticPropsPainDirectories,
} from "../../../utils/dataFetching";

import DirectoryItem from "../../../components/directoryItem";
import React from "react";
import ResourcePageLayout from "../../../components/reusables/ResourcePageLayout";
import { directoryCategories } from "../../../components/reusables/Filters";

const Directory = ({
  pain,
  directories,
}: {
  pain: PainDetail;
  directories: DirectoryDetail[];
}) => {
  const relatedDirectoryItem = directories.filter(
    (directoryItem: DirectoryDetail) =>
      directoryItem.isValidated === true &&
      directoryItem.relatedPain?.some((related) => related._ref === pain._id)
  );

  return (
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
            {categorizedDirectoryItem.map((directoryItem: DirectoryDetail) => (
              <DirectoryItem contact={directoryItem} key={directoryItem._id} />
            ))}
          </div>
        );
      })}
    </ResourcePageLayout>
  );
};

export default Directory;
export const getStaticProps: GetStaticProps = getStaticPropsPainDirectories;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
