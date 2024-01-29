import {
  MediaDetail,
  MediaDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { GetStaticPaths } from "next";
import Layout from "../../../components/Layout";
import MediaItem from "../../../components/mediaItem";
import React from "react";
import ResourcePageLayout from "../../../components/reusables/ResourcePageLayout";
import { client } from "../../../config/sanity/client";
import { getStaticPathsPain } from "../../../utils/dataFetching";
import { mediaCategories } from "../../../components/reusables/Filters";

const Medias = ({
  pain,
  medias,
  headerMenu,
  footerMenu,
}: {
  pain: PainDetail;
  medias: MediaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const relatedMedia = medias.filter((mediaItem: MediaDetail) =>
    mediaItem.relatedPain?.some((related) => related._ref === pain._id)
  );

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
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
    </Layout>
  );
};

export default Medias;
export const getStaticProps = async ({ params }: any) => {
  try {
    const { pain } = params!;
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedMedias: MediaDetails[] | null = await client.fetch(
      `*[_type == "media" && references($painId)]`,
      { painId: fetchedPain?._id }
    );

    if (!fetchedPain || !fetchedMedias) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pain: fetchedPain,
        medias: fetchedMedias,
        headerMenu,
        footerMenu,
      },
    };
  } catch (error) {
    console.error("Error fetching medias:", error);
    return {
      props: { pain: null, medias: [] },
    };
  }
};
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
