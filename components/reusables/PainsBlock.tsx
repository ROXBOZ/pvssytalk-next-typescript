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

  return (
    <>
      <div className="double-column-container">
        <div>
          <h2>{data.title}</h2>
        </div>
        <div>
          <div className="bigger-text">
            <PortableText value={data.text as any} />
          </div>
          <Filters
            filterOptions={bodyParts}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
      </div>

      <div className="pain-cards-container">
        {filteredPains.map((pain: PainDetail) => (
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
}

export default PainsBlock;
