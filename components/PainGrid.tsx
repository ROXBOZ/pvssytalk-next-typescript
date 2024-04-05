import Filters, { bodyParts } from "./reusables/Filters";
import React, { useEffect, useState } from "react";
import { client, urlFor } from "../config/sanity/client";

import Image from "next/image";
import Link from "next/link";
import { PainDetail } from "../types";

const PainGrid = ({ pains }: { pains: PainDetail[] }) => {
  const sortedPains = pains.sort((a, b) => a.name.localeCompare(b.name));
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredPains = sortedPains.filter((pain) =>
    selectedFilter ? pain.filters.includes(selectedFilter) : true
  );

  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <>
      <div
        className={`double-column-container ${
          currentURL.endsWith("douleurs") && "no-border"
        }`}
      >
        <div>
          {currentURL.endsWith("douleurs") ? (
            <h1>Douleurs</h1>
          ) : (
            <h2>Mieux connaître ses douleurs</h2>
          )}
        </div>
        <div>
          <p className="bigger-text">
            Chaque douleur est traitée avec une approche à la fois médicale et
            sexologique pour te donner une vision complète. Tu trouveras
            également des <Link href="/ressources">ressources</Link> pour aller
            plus loin.
          </p>
          <Filters
            filterOptions={bodyParts}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
      </div>

      <div className="cards-container">
        {filteredPains.map((pain) => (
          <div className="card" key={pain._id}>
            <Link href={`/douleurs/${pain.slug.current}`} passHref>
              <div className="card-content">
                <div className="card-image-container">
                  {pain.mainImage && (
                    <Image
                      loading="lazy"
                      className="card-image"
                      src={urlFor(pain.mainImage.asset._ref).url()}
                      width={500}
                      height={300}
                      alt={pain.name}
                    />
                  )}
                </div>
                <div className="text-container">
                  <h3 className="bigger-text">{pain.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PainGrid;
export const getStaticProps = async () => {
  try {
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {..., filters}'
    );
    return {
      props: { pains },
    };
  } catch (error) {
    return {
      props: { pains: [] },
    };
  }
};
