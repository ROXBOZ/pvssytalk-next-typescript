import { DirectoryDetail } from "../../types";
import DirectoryItem from "../DirectoryItem";
import React from "react";

const DirectoryLayout: React.FC<any> = ({
  category,
  categorizedDirectoryItem,
  selectedPain,
  selectedRegion,
}) => {
  const validatedItems = categorizedDirectoryItem.filter(
    (directoryItem: DirectoryDetail) => directoryItem.isValidated === true
  );

  return (
    <div className="directory-container">
      {validatedItems.map((directoryItem: DirectoryDetail, index: number) => {
        const itemPains: string[] = (directoryItem.relatedPain || []).map(
          (p: any) => p.name
        );
        const itemRegions: string[] = (directoryItem.addresses || []).map(
          (a: any) => a.region
        );

        console.log("itemRegions", itemRegions);

        if (
          (selectedPain &&
            !selectedRegion &&
            itemPains.includes(selectedPain)) ||
          (selectedRegion &&
            !selectedPain &&
            itemRegions.includes(selectedRegion)) ||
          (!selectedRegion && !selectedPain) ||
          (selectedRegion &&
            selectedPain &&
            itemPains.includes(selectedPain) &&
            itemRegions.includes(selectedRegion)) ||
          (selectedRegion && itemRegions.length === 0)
        ) {
          return (
            <React.Fragment key={index}>
              {validatedItems.length !== 0 && (
                <h2 className="h3 category-title">{category.title}</h2>
              )}
              <DirectoryItem contact={directoryItem} />
            </React.Fragment>
          );
        }

        return null;
      })}
    </div>
  );
};

export default DirectoryLayout;
