import { GetStaticPaths, GetStaticProps } from "next";
import { MediaDetail, PainDetail } from "../../../types";
import {
  getStaticPathsPain,
  getStaticPropsPainMedias,
} from "../../../utils/dataFetching";

import MediaItem from "../../../components/mediaItem";
import React from "react";
import ResourcePageLayout from "../../../components/reusables/ResourcePageLayout";
import { mediaCategories } from "../../../components/reusables/Filters";

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
    <ResourcePageLayout
      pageName="Médias"
      pain={pain}
      relatedContent={relatedMedia}
    >
      <div className="medias-container">
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

              {categorizedMedia.map((media: MediaDetail, index: number) => (
                <MediaItem key={index} mediaItem={media} />
              ))}
            </div>
          );
        })}
      </div>
    </ResourcePageLayout>
  );
};

export default Medias;
export const getStaticProps: GetStaticProps = getStaticPropsPainMedias;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
