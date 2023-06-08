import React from "react";
import Filters, { bodyParts } from "./Filters";
import Link from "next/link";
import { client } from "../../utils/sanity/client";
// import { urlFor } from "../../utils/sanity/client";
// import ScrollToTop from "../../utils/ScrollToTop";

type PainDetail = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  mainImage: {
    hotspot: boolean;
    caption: string;
    alternativeText: string;
    url: string;
  };
  medicalApproach: {
    def: string;
    schema1: {
      hotspot: boolean;
      caption: string;
      alternativeText: string;
    };
    schema2: {
      hotspot: boolean;
      caption: string;
      alternativeText: string;
    };
    diag: string;
    sympt: string;
    why: string;
    auto: string;
    pros: string;
  };
  sexologicApproach: {
    body: string;
    norms: string;
    everydayLife: string;
    libido: string;
    charge: string;
    consent: string;
    mental: string;
    parenthood: string;
    checkup: string;
    treatments: string;
    pleasure: string;
  };
};

const PainGrid = ({ pains }: { pains: PainDetail[] }) => {
  console.log("pains front :", pains);
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
        {pains &&
          pains.map((pain) => (
            <div className="pain-card" key={pain._id}>
              <Link
                // onClick={ScrollToTop}
                href={`/douleurs/${pain.slug.current}`}
                passHref
              >
                <div className="pain-card-content">
                  {/* {pain.mainImage && (
                    <img src={urlFor(pain.mainImage).url()} alt={pain.name} />
                  )} */}
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
//NOTE getStaticProps (SEO) ou getServerSideProps (auth)
export const getStaticProps = async () => {
  console.log("hello");
  try {
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );
    console.log("pains :", pains);
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
