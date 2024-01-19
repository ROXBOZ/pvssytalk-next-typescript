import { HomeDetail, PainDetail } from "../types";

import About from "../components/About";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Link from "next/link";
import Marquee from "../components/Marquee";
import PainGrid from "./douleurs";
import Ressources from "./ressources";
import Tagline from "../components/Tagline";
import { client } from "../config/sanity/client";

const Home = ({ pains, home }: { pains: PainDetail[]; home: HomeDetail[] }) => {
  const tagline = home[0].tagline;
  const marquee = home[0].marquee;
  const intro = home[0].intro;
  const about = home[0].about;

  return (
    <div>
      <div className="landing-view">
        <Header />
        <Tagline tagline={tagline} />
        {marquee && <Marquee marquee={marquee} />}
      </div>
      <div className="double-column-containers-group">
        <Intro intro={intro} />
        <PainGrid pains={pains} />
        <div className="double-column-container">
          <div>
            <h2>Se soigner</h2>
          </div>
          <div>
            <nav className="nav-directory">
              <Link href="ressources/exercices">Exercices sexo</Link>
              <Link href="ressources/annuaire">Annuaire de spécialistes</Link>
              {/* <Link href="ressources/glossaire">Glossaire</Link>
              <Link href="ressources/medias">Médias</Link> */}
              {/* <Link href="ressources/agenda">Agenda</Link> */}
            </nav>
          </div>
        </div>
        <About about={about} />
        <div className="double-column-container">
          <div>
            <h2>Ressources utiles</h2>
          </div>
          <div>
            <nav className="nav-directory">
              <Link href="ressources/glossaire">Glossaire</Link>
              <Link href="ressources/medias">Médias</Link>
              <Link href="ressources/agenda">Agenda</Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const home: HomeDetail = await client.fetch(
      '*[_type == "homepage" && !(_id in path("drafts.**"))]{..., intro {...,navigation[]->{...}}}'
    );
    const pains: PainDetail = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );

    return {
      props: { pains, home },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
