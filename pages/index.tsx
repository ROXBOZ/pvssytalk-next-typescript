import Intro from "../components/Intro";
import Marquee from "../components/Marquee";
import { PainDetail } from "../types";
import PainGrid from "./douleurs";
import Ressources from "./ressources";
import Start from "./commencer";
import Tagline from "../components/Tagline";
import { client } from "../config/sanity/client";

const Home = ({ pains }: { pains: any }) => {
  return (
    <div>
      <Tagline />
      <Marquee />
      <div className="double-column-containers-group">
        <Intro />
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
    const pains: PainDetail = await client.fetch(
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
