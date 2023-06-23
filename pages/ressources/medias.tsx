import React, { useState } from "react";
import RessourceNav from "../../components/ressourceNav";
import Filters, { mediaCategories } from "../../components/reusables/Filters";
import { MediaDetail } from "../../types";
import { getStaticPropsMedia } from "../../props/dataFetching";
import { GetStaticProps } from "next";
import MediaItem from "../../components/mediaItem";

const Medias = ({ media }: { media: MediaDetail[] }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Médias <sup>{media.length}</sup>
          </h1>
          <RessourceNav />
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
                <h2 className="h3">
                  {category.title} <sup>{categorizedMediaItem.length}</sup>
                </h2>

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
