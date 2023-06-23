import React from "react";
import { MediaDetail, PainDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { mediaCategories } from "../../../components/reusables/Filters";
import PainNav from "../../../components/painNav";
import {
  getStaticPathsPain,
  getStaticPropsPainMedia,
} from "../../../props/dataFetching";
import MediaItem from "../../../components/mediaItem";

const Medias = ({
  pain,
  media,
}: {
  pain: PainDetail;
  media: MediaDetail[];
}) => {
  const relatedMedia = media.filter((mediaItem: MediaDetail) =>
    mediaItem.relatedPain?.some((related) => related._ref === pain._id)
  );

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Médias{" "}
            <a href="./" className="colored logo">
              {pain.name}
            </a>
          </h1>
          <PainNav pain={pain} />
        </div>
        <div>
          {mediaCategories.map((category) => {
            const categorizedMedia = relatedMedia.filter(
              (mediaItem) => mediaItem.filter === category.value
            );

            if (categorizedMedia.length === 0) {
              return null;
            }
            return (
              <div key={category.title} className="media-container">
                <h2 className="h3">
                  {category.title} <sup>{categorizedMedia.length}</sup>
                </h2>

                {categorizedMedia.map((media: MediaDetail) => (
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
export const getStaticProps: GetStaticProps = getStaticPropsPainMedia;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
