import Filters, {
  mediaCategories,
  pains,
} from "../../components/reusables/Filters";
import React, { useState } from "react";

import { GetStaticProps } from "next";
import { MediaDetail } from "../../types";
import MediaItem from "../../components/mediaItem";
import RessourceNav from "../../components/ressourceNav";
import { getStaticPropsMedia } from "../../utils/dataFetching";

const Medias = ({ media }: { media: MediaDetail[] }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div className="fixed-container">
          <h1>
            Médias <sup>{media.length}</sup>
          </h1>
          <RessourceNav />
          <Filters
            filterOptions={pains}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
        <div>
          {mediaCategories.map((category) => {
            if (typeof category === "string") {
              return null;
            }

            const categorizedMediaItem = media.filter(
              (mediaItem) => mediaItem.filter === category.value
            );

            if (categorizedMediaItem.length === 0) {
              return null;
            }

            return (
              <div key={category.value} className="media-container">
                <h2 className="h3">{category.title}</h2>

                {categorizedMediaItem.map((media: MediaDetail) => (
                  <MediaItem mediaItem={media} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Medias;
export const getStaticProps: GetStaticProps = getStaticPropsMedia;
