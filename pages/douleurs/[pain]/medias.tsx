import React from "react";
import { MediaDetail, MediaDetails, PainDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../../utils/sanity/client";
import { mediaCategories } from "../../../components/reusables/Filters";
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
            Littérature et médias{" "}
            <span className="colored logo">{pain.name}</span>
          </h1>
          <div>
            <nav className="nav-directory">
              <a href="/ressources/medias">Répertoire complet</a>
              <a href="/douleurs">Toutes les douleurs</a>
            </nav>
          </div>
        </div>
        <div>
          {mediaCategories.map((category) => {
            const filteredMedia = relatedMedia.filter(
              (mediaItem) => mediaItem.filter === category.value
            );
            if (filteredMedia.length === 0) {
              return null;
            }
            return (
              <div className="media-container">
                <h2 className="h3">{category.title}</h2>
                {filteredMedia.map((mediaItem: MediaDetail) => (
                  <div className="media-item" key={mediaItem._id}>
                    <p>
                      {mediaItem.author},{" "}
                      {mediaItem.year && <>({mediaItem.year}). </>}
                      {mediaItem.url ? (
                        <a href={mediaItem.url} target="_blank">
                          <strong>
                            <em>{mediaItem.title}</em>
                          </strong>
                        </a>
                      ) : (
                        <strong>
                          <em>{mediaItem.title},</em>
                        </strong>
                      )}{" "}
                      {/* [{category.title}]{" "} */}
                      {mediaItem.editor && <span> {mediaItem.editor}</span>}
                    </p>
                  </div>
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs: string[] = await client.fetch(
      `*[_type == "pain"].slug.current`
    );

    const paths = slugs.map((slug) => ({
      params: { pain: slug },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedMedia: MediaDetails[] | null = await client.fetch(
      `*[_type == "media" && !(_id in path("drafts.**"))]`
    );
    if (!fetchedPain || !fetchedMedia) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, media: fetchedMedia },
    };
  } catch (error) {
    console.error("Error fetching medias:", error);
    return {
      props: { pain: null, media: [] },
    };
  }
};
