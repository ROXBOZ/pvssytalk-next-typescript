import {
  MediaDetail,
  MediaDetails,
  MenuDetail,
  PainDetail,
  typeformDetail,
} from "../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/layouts/Layout";
import MediaLayout from "../../components/layouts/MediaLayout";
import ResourcePageLayout from "../../components/layouts/ResourcePageLayout";
import { client } from "../../config/sanity/client";
import { mediaCategories } from "../../components/reusables/Filters";

const Medias = ({
  media,
  headerMenu,
  footerMenu,
  typeform,
}: {
  media: MediaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  typeform: typeformDetail;
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <ResourcePageLayout
        pageName="Médias"
        relatedContent={media}
        typeform={typeform}
      >
        {mediaCategories.map((category, index) => {
          if (typeof category === "string") {
            return null;
          }

          const categorizedMediaItem = media.filter(
            (mediaItem) =>
              mediaItem.relatedPain &&
              mediaItem.relatedPain.some(
                (pain: any) =>
                  pain.name.toLowerCase() === selectedFilter?.toLowerCase()
              ) &&
              mediaItem.filter === category.value
          );

          if (selectedFilter && categorizedMediaItem.length === 0) {
            return (
              <div
                key={`${category.value}_${index}`}
                className="media-container"
              >
                <h2 className="h3">{category.title}</h2>
                <div className="msg-box">
                  <p className="msg info">
                    Tu as une recommandation? Contacte-nous!
                  </p>
                </div>
              </div>
            );
          }

          return (
            <MediaLayout
              key={category.value}
              category={category}
              categorizedMedia={categorizedMediaItem}
            />
          );
        })}
      </ResourcePageLayout>
    </Layout>
  );
};

export default Medias;

export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const media: MediaDetails = await client.fetch(`
      *[_type == "media" && !(_id in path("drafts.**"))]{
        ...,
        relatedPain[]->{
          name
        }
      }
    `);
    const pains: PainDetail = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );

    const typeform: typeformDetail = await client.fetch(`
      *[_type == "typeform" && !(_id in path("drafts.**"))] {
        typeforms[] {
          typeformName,
          typeformLink
        }
      }`);

    return {
      props: { media, pains, headerMenu, footerMenu, typeform },
    };
  } catch (error) {
    console.error("Error fetching media:", error);
    return {
      props: { media: [], pains: [] },
    };
  }
};
