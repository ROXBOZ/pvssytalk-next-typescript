import type { NextPage } from "next";
import Tagline from "../components/Tagline";
import Marquee from "../components/Marquee";
import PainGrid from "./douleurs";
import Ressources from "./ressources";
import Start from "./start";
import { sanityClient } from "../utils/sanity/client";

type Pain = {
  _id: string;
  name: string;
  mainImage: {
    hotspot: boolean;
    caption: string;
    alternativeText: string;
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

type HomeProps = {
  pains: Pain[];
};

const Home: NextPage<HomeProps> = ({ pains }) => {
  return (
    <div>
      <Tagline />
      <Marquee />
      <div className="double-column-containers">
        <div className="double-column-container">
          <div>
            <h2>Avoir mal n’est pas normal</h2>
          </div>
          <div>
            <p className="bigger-text">
              Les douleurs sexuelles concernent{" "}
              <u>une personne à vulve sur cinq</u>. Elles peuvent toucher à la
              vulve, au vagin, et s’étendre au-delà de l’utérus. Ces douleurs
              peuvent avoir des répercussions importantes sur différents aspects
              de sa vie, sa sexualité, ou sa santé mentale et physique.{" "}
              <u>Avoir mal n’est pas normal</u>. Encore moins lorsqu’il s’agit
              de ton plaisir et ta sexualité. N’hésite pas à t’informer et
              t’entourer de soignant·exs <em>safe</em> pour t’accompagner dans
              ton parcours de soin.
            </p>
          </div>
        </div>
        <Start />
        <PainGrid pains={pains} />
        <Ressources />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const pains: Pain[] = await sanityClient.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
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
