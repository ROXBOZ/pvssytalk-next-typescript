import { GlobalDetail, PainDetail } from "../types";

import Header from "../components/Header";
import Intro from "../components/Intro";
import Marquee from "../components/Marquee";
import PainGrid from "./douleurs";
import Ressources from "./ressources";
import Start from "./commencer";
import Tagline from "../components/Tagline";
import { client } from "../config/sanity/client";

const Home = ({
  pains,
  global,
}: {
  pains: PainDetail[];
  global: GlobalDetail[];
}) => {
  const tagline = global[0].tagline;
  const marquee = global[0].marquee;

  return (
    <div>
      <div className="landing-view">
        <Header />
        <Tagline tagline={tagline} />
        {marquee && <Marquee marquee={marquee} />}
      </div>
      <div className="double-column-containers-group">
        <Intro intro={global[0].intro} />
        <Start />
        <PainGrid pains={pains} />
        <Ressources />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const global: GlobalDetail = await client.fetch(
      '*[_type == "global" && !(_id in path("drafts.**"))]{...}'
    );
    const pains: PainDetail = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );
    console.log("pains :", pains);
    return {
      props: { pains, global },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
