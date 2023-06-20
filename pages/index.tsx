import Tagline from "../components/Tagline";
import Marquee from "../components/Marquee";
import Ressources from "./ressources";
import Start from "./commencer";
import PainGrid from "./douleurs";
import { PainDetails } from "../types";
import { client } from "../utils/sanity/client";
import Intro from "../components/Intro";

const Home = ({ pains }: { pains: PainDetails }) => {
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
    const pains: PainDetails = await client.fetch(
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
