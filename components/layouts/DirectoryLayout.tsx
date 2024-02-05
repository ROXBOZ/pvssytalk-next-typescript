import { DirectoryDetail } from "../../types";
import DirectoryItem from "../directoryItem";
import React from "react";

function DirectoryLayout({ category, categorizedDirectoryItem }: any) {
  const validatedItems = categorizedDirectoryItem.filter(
    (directoryItem: DirectoryDetail) => directoryItem.isValidated === true
  );

  return (
    <div key={category.value} className="directory-container">
      {validatedItems.length !== 0 && (
        <h2 className="h3 category-title">{category.title}</h2>
      )}
      {categorizedDirectoryItem.map(
        (directoryItem: DirectoryDetail, index: number) => {
          if (directoryItem.isValidated === true) {
            return <DirectoryItem contact={directoryItem} key={index} />;
          }
        }
      )}
    </div>
  );
}

export default DirectoryLayout;
