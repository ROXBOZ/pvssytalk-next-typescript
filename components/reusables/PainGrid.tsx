import React from "react";
import Filters, { bodyParts } from "./Filters";
import Link from "next/link";
import { client, urlFor } from "../../utils/sanity/client";
import { PainDetail } from "../../types";
import Image from "next/image";

const PainGrid = ({ pains }: { pains: PainDetail[] }) => {
  const sortedPains = pains.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <div className="double-column-container">
        <div>
          <h2>Mieux connaître ses douleurs</h2>
        </div>
        <div>
          <p className="bigger-text">
            Chaque douleur est traitée avec une approche à la fois médicale et
            sexologique pour te donner une vision complète. Tu trouveras
            également des ressources pour aller plus loin.
          </p>
        </div>
      </div>

      <Filters filterOptions={bodyParts} />

      <div className="pain-cards-container">
        {sortedPains &&
          sortedPains.map((pain) => (
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
export const getStaticProps = async () => {
  try {
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {...}'
    );
    return {
      props: { pains },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
