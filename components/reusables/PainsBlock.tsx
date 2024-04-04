import Filters, { bodyParts } from "./Filters";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { PainDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../config/sanity/client";

function PainsBlock({ data, pains }: { data: any; pains: PainDetail[] }) {
  const sortedPains = pains.sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredPains = sortedPains.filter((pain: any) =>
    selectedFilter ? pain.filters.includes(selectedFilter) : true
  );

  const hasEmptySpot = filteredPains.length % 3 !== 0 && pains.length % 2 === 0;
  const hasTwoEmptySpots = filteredPains.length % 3 === 1;

  return (
    <>
      <div className="double-column-container snap-section">
        <div>
          <h2>{data.title}</h2>
          <Filters
            filterOptions={bodyParts}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
        <div>
          <div className="bigger-text">
            <PortableText value={data.text as any} />
          </div>
        </div>
      </div>

      <div className="cards-container">
        {filteredPains.map((pain: PainDetail, index: number) => {
          return (
            <div className="card" key={index}>
              <Link href={`/douleurs/${pain.slug.current}`} passHref>
                <div className="card-content">
                  <div className="card-image-container">
                    {pain.mainImage && (
                      <Image
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
          );
        })}

        {hasEmptySpot && (
          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              className="bigger-text"
              style={{
                padding: "2rem",
              }}
            >
              Nous travaillons actuellement sur de nouvelles douleurs. Si l’une
              t’intéresse en particulier, n’hésite pas à nous contacter.
            </p>
          </div>
        )}
        {hasTwoEmptySpots && (
          <>
            <div
              style={{
                backgroundColor: "#fefdf4",
                width: "100%",
                gridColumn: "span 4",
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default PainsBlock;
