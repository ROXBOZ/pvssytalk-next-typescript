import {
  MediaDetail,
  MediaDetails,
  MenuDetail,
  PainDetail,
} from "../../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../../lib/queries";

import { GetStaticPaths } from "next";
import Layout from "../../../components/layouts/Layout";
import MediaLayout from "../../../components/layouts/MediaLayout";
import ResourcePageLayout from "../../../components/layouts/ResourcePageLayout";
import { client } from "../../../config/sanity/client";
import { getStaticPathsPain } from "../../../utils/dataFetching";
import { mediaCategories } from "../../../components/reusables/Filters";

const Medias = ({
  pain,
  medias,
  headerMenu,
  footerMenu,
  painsSlugs,
}: {
  pain: PainDetail;
  medias: MediaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  painsSlugs: any;
}) => {
  const relatedMedia = medias.filter((mediaItem: MediaDetail) =>
    mediaItem.relatedPain?.some((related) => related._ref === pain._id)
  );
  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  return (
    <Layout
      painsSlugs={painsSlugs}
      headerMenu={headerMenu}
      footerMenu={footerMenu}
    >
      <ResourcePageLayout
        pageName="Médias"
        pain={pain}
        relatedContent={relatedMedia}
        selectedPain={selectedPain}
        setSelectedPain={setSelectedPain}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      >
        <div className="media-container">
          {mediaCategories.map((category: any, index: number) => {
            const categorizedMedia = relatedMedia.filter(
              (mediaItem) => mediaItem.filter === category.value
            );

            if (categorizedMedia.length === 0) {
              return null;
            }

            return (
              <MediaLayout
                key={index}
                category={category}
                categorizedMedia={categorizedMedia}
                selectedPain={selectedPain}
              />
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
      `*[_type == "media" && references($painId)]{..., tags[]->{name}}`,
      { painId: fetchedPain?._id }
    );
    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
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
        painsSlugs,
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
