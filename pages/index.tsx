import { MenuDetail, PainDetail } from "../types";

import Header from "../components/Header";
import Marquee from "../components/Marquee";
import NavBlock from "../components/reusables/NavBlock";
import PainsBlock from "../components/reusables/PainsBlock";
import Tagline from "../components/Tagline";
import TextImageBlock from "../components/reusables/TextImageBlock";
import { client } from "../config/sanity/client";

interface HomeDetail {
  _id: string;
  tagline: string;
  marquee: string;
  content: any;
  intro: any;
  navigation: any;
}

const Home = ({
  home,
  pains,
  headerMenu,
}: {
  pains: PainDetail[];
  home: HomeDetail[];
  headerMenu: MenuDetail[];
}) => {
  const menu = headerMenu[0].headerMenu;
  return (
    <div>
      <div className="landing-view">
        <Header data={menu} />
        <Tagline tagline={home[0].tagline} />
        {home[0].marquee && <Marquee marquee={home[0].marquee} />}
      </div>

      {home[0].content && (
        <div className="content">
          {home[0].content.map((item: any, index: number) => {
            if (item && item._type) {
              switch (item._type) {
                case "navBlock":
                  return <NavBlock data={item} key={index} />;
                case "painsBlock":
                  return <PainsBlock data={item} pains={pains} key={index} />;
                case "textImageBlock":
                  return <TextImageBlock data={item} key={index} />;

                default:
                  return null;
              }
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const home: HomeDetail[] = await client.fetch(
      '*[_type == "homepage" && !(_id in path("drafts.**"))]{..., content[] { ..., _type =="textImageBlock" => {..., callToAction {..., link->{slug {current}}}}, _type == "navBlock" => { ..., navigation[]-> { title, slug {current}}}}}'
    );
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {..., filters}'
    );
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );

    return {
      props: { pains, home, headerMenu },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
