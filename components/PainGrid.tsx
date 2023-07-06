import React, { useEffect, useState } from "react";
import Filters, { bodyParts } from "./reusables/Filters";
import Link from "next/link";
import { urlFor } from "../config/sanity/client";
import { PainDetail } from "../types";
import Image from "next/image";
import { GetStaticProps } from "next";
import { getStaticPropsPains } from "../utils/dataFetching";

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
            également des <a href="/ressources">ressources</a> pour aller plus
            loin.
          </p>
          <Filters
            filterOptions={bodyParts}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
      </div>

      <div className="pain-cards-container">
        {filteredPains.map((pain) => (
          <div className="pain-card" key={pain._id}>
            <Link href={`/douleurs/${pain.slug.current}`} passHref>
              <div className="pain-card-content">
                {pain.mainImage && (
                  <Image
                    className="pain-card-image"
                    src={urlFor(pain.mainImage.asset._ref).url()}
                    width={500}
                    height={300}
                    alt={pain.name}
                  />
                )}
                <h3 className="bigger-text">{pain.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PainGrid;
export const getStaticProps: GetStaticProps = getStaticPropsPains;
