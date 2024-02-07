import { MenuDetail, PainDetail } from "../types";
import { fetchFooterMenu, fetchHeaderMenu } from "../lib/queries";

import Footer from "../components/Footer";
import Header from "../components/Header";
import LogosPartners from "../components/LogosPartners";
import Marquee from "../components/Marquee";
import Marquee2 from "../components/Marquee2";
import NavBlock from "../components/reusables/NavBlock";
import PageTransition from "../components/layouts/PageTransition";
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

interface LogosDetail {
  partners: {
    name: string;
    logo: any;
  }[];
}

const Home = ({
  headerMenu,
  home,
  pains,
  footerMenu,
  logos,
  painsSlugs,
}: {
  headerMenu: MenuDetail[];
  pains: PainDetail[];
  home: HomeDetail[];
  footerMenu: MenuDetail[];
  logos: LogosDetail[];
  painsSlugs: any;
}) => {
  const headerMenuData = headerMenu[0].headerMenu;
  const footerMenuData = footerMenu[0].footerMenu;
  const partnersLogos = logos[0].partners;

  return (
    <PageTransition>
      <div className="landing-view">
        <Header data={headerMenuData} pains={painsSlugs} />
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

      <LogosPartners logos={partnersLogos} />
      <Marquee2 repeatTimes={999} />
      <Footer data={footerMenuData} />
    </PageTransition>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const home: HomeDetail[] = await client.fetch(
      '*[_type == "homepage" && !(_id in path("drafts.**"))]{..., content[] { ..., _type =="textImageBlock" => {..., callToAction {..., link->{slug {current}}}}, _type == "navBlock" => { ..., navigation[]-> { title, slug {current}}}}}'
    );
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {..., filters}'
    );
    const logos: LogosDetail[] = await client.fetch(
      '*[_type == "partnersLogos" && !(_id in path("drafts.**"))]'
    );

    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );

    return {
      props: { headerMenu, footerMenu, pains, home, logos, painsSlugs },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
