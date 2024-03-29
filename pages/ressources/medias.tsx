import {
  MediaDetail,
  MediaDetails,
  MenuDetail,
  PainDetail,
  typeformDetail,
} from "../../types";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import CustomHead from "../../components/CustomHead";
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
  seo,
  regions,
  painsSlugs,
  marquee,
}: {
  media: MediaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  typeform: typeformDetail;
  seo: any;
  regions: any;
  painsSlugs: any;
  marquee: any;
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedPain, setSelectedPain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <>
      <CustomHead seo={seo[0].medias} />
      <Layout
        painsSlugs={painsSlugs}
        headerMenu={headerMenu}
        footerMenu={footerMenu}
        marquee={marquee}
      >
        <ResourcePageLayout
          pageName="Médias"
          relatedContent={media}
          typeform={typeform}
          selectedPain={selectedPain}
          setSelectedPain={setSelectedPain}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          regions={regions[0].regions}
        >
          {mediaCategories.map((category, index) => {
            if (typeof category === "string") {
              return null;
            }

            const categorizedMediaItem = media.filter(
              (mediaItem) =>
                mediaItem.filter &&
                mediaItem.filter &&
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
                selectedPain={selectedPain}
              />
            );
          })}
        </ResourcePageLayout>
      </Layout>
    </>
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
        tags[]->{name},
        relatedPain[]->{
          name
        }
      }
    `);
    const pains: PainDetail = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );

    const seo: any = await client.fetch(
      '*[_type == "seoManager" && !(_id in path("drafts.**"))]'
    );

    const typeform: typeformDetail = await client.fetch(`
      *[_type == "typeform" && !(_id in path("drafts.**"))] {
        typeforms[] {
          typeformName,
          typeformLink
        }
      }`);
    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );

    const regions: any = await client.fetch(
      `*[_type == "region" && !(_id in path("drafts.**"))]{
          regions[]{
            name
          }
        }`
    );

    const marquee: any = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))]{marquee}'
    );

    return {
      props: {
        media,
        pains,
        headerMenu,
        footerMenu,
        typeform,
        seo,
        regions,
        painsSlugs,
        marquee,
      },
    };
  } catch (error) {
    console.error("Error fetching media:", error);
    return {
      props: { media: [], pains: [] },
    };
  }
};
