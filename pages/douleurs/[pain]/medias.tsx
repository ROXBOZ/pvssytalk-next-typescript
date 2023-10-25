import React from "react";
import { MediaDetail, PainDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { mediaCategories } from "../../../components/reusables/Filters";
import PainNav from "../../../components/painNav";
import {
  getStaticPathsPain,
  getStaticPropsPainMedias,
} from "../../../utils/dataFetching";
import MediaItem from "../../../components/mediaItem";

const Medias = ({
  pain,
  medias,
}: {
  pain: PainDetail;
  medias: MediaDetail[];
}) => {
  const relatedMedia = medias.filter((mediaItem: MediaDetail) =>
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
             <sup className="no-color">{medias.length}</sup>
          </h1>
          <PainNav pain={pain} />
        </div>
        <div>
          {mediaCategories.map((category: any) => {
            const categorizedMedia = relatedMedia.filter(
              (mediaItem) => mediaItem.filter === category.value
            );

            if (categorizedMedia.length === 0) {
              return null;
            }
            return (
              <div key={category.title} className="media-container">
                <h2 className="h3">{category.title}</h2>

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
export const getStaticProps: GetStaticProps = getStaticPropsPainMedias;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
