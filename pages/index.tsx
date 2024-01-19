import { HomeDetail, PainDetail } from "../types";

import Header from "../components/Header";
import Intro from "../components/Intro";
import Marquee from "../components/Marquee";
import PainGrid from "./douleurs";
import Ressources from "./ressources";
import Tagline from "../components/Tagline";
import { client } from "../config/sanity/client";

const Home = ({ pains, home }: { pains: PainDetail[]; home: HomeDetail[] }) => {
  const tagline = home[0].tagline;
  const marquee = home[0].marquee;
  const intro = home[0].intro;

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
        <Ressources />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const home: HomeDetail = await client.fetch(
      '*[_type == "homepage" && !(_id in path("drafts.**"))]{...}'
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
