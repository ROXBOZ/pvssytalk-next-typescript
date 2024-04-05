import Filters, { bodyParts } from "./Filters";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { PainDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../config/sanity/client";

function PainsBlock({ data, pains }: { data?: any; pains: PainDetail[] }) {
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
    <div className="snap-section">
      <div className="double-column-container">
        {!data && (
          <>
            <div>
              <h1>Douleurs</h1>
            </div>
            <div>
              <p className="bigger-text">
                Chaque douleur est traitée avec une approche à la fois médicale
                et sexologique pour te donner une vision complète. Tu trouveras
                également des <Link href="/ressources">ressources</Link> pour
                aller plus loin.
              </p>
              <Filters
                filterOptions={bodyParts}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>
          </>
        )}
        <div>{data?.title && <h2>{data.title}</h2>}</div>
        {data && (
          <Filters
            filterOptions={bodyParts}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
        <div>
          {data?.text && (
            <div className="bigger-text">
              <PortableText value={data?.text as any} />
            </div>
          )}
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
            {data?.note && (
              <div className="bigger-text note">
                <PortableText value={data?.note as any} />
              </div>
            )}
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
    </div>
  );
}

export default PainsBlock;
