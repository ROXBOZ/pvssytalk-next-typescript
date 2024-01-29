import Filters, {
  mediaCategories,
  pains,
} from "../../components/reusables/Filters";
import { MediaDetail, MediaDetails, MenuDetail, PainDetail } from "../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import MediaItem from "../../components/mediaItem";
import RessourceNav from "../../components/ressourceNav";
import { client } from "../../config/sanity/client";

const Medias = ({
  media,
  headerMenu,
  footerMenu,
}: {
  media: MediaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredMedias = media.filter((mediaItem) => {
    return (
      !selectedFilter ||
      (mediaItem.relatedPain &&
        mediaItem.relatedPain.some(
          (pain: any) =>
            pain.name.toLowerCase() === selectedFilter.toLowerCase()
        ))
    );
  });

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
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

              const categorizedMediaItem = filteredMedias.filter(
                (mediaItem) => mediaItem.filter === category.value
              );

              if (selectedFilter && categorizedMediaItem.length === 0) {
                return (
                  <div key={category.value} className="media-container">
                    <h2 className="h3">{category.title}</h2>
                    <div className="msg-box">
                      <p className="msg info">
                        Tu as une recommendation? Contacte-nous!
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={category.value} className="media-container">
                  <h2 className="h3">{category.title}</h2>
                  {categorizedMediaItem.map(
                    (media: MediaDetail, index: number) => (
                      <MediaItem mediaItem={media} key={index} />
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
    return {
      props: { media, pains, headerMenu, footerMenu },
    };
  } catch (error) {
    console.error("Error fetching media:", error);
    return {
      props: { media: [], pains: [] },
    };
  }
};
