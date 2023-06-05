import React from "react";
import Filters, { bodyParts } from "../../components/reusables/Filters";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../../utils/sanity/client";

type Pain = {
  _id: string;
  name: string;
  mainImage: string;
};

type Props = {
  pains: Pain[];
};

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: string) {
  return builder.image(source);
}

const PainGrid: React.FC<Props> = ({ pains }) => {
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
      {console.log("pains :", pains)}
      <div className="pain-card-container">
        {pains.map((pain: Pain) => (
          <Link
            key={pain._id}
            className="pain-card"
            href="/"
            // onClick={scrollToTop}
            //SLUG
            // to={{
            //   pathname: `/douleurs/${pain.name.toLowerCase()}/medical`,
            // }}
          >
            <div className="pain-card-content">
              {pain.mainImage && <img src={urlFor(pain.mainImage).url()} />}
              <h3 className="subtitle">{pain.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PainGrid;
