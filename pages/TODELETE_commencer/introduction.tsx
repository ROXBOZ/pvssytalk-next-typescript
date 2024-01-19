import { InfoPageDetail } from "../../types";
import { InfoPageHeader } from "../../components/reusables/InfoPageHeader";
import InfoPageSection from "../../components/reusables/InfoPageSections";
import React from "react";
import { client } from "../../config/sanity/client";

const IntroPage = ({ IntroPage }: { IntroPage: InfoPageDetail[] }) => {
  let intro = IntroPage[0];
  return (
    <>
      <InfoPageHeader data={intro} />
      <InfoPageSection data={intro.sections} />
    </>
  );
};

export default IntroPage;

export const getStaticProps = async () => {
  try {
    const IntroPage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "10c30e52-94bc-4b41-9200-2eb8c89c4997" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { IntroPage },
    };
  } catch (error) {
    console.error("Error fetching IntroPage:", error);
    return {
      props: { IntroPage: [] },
    };
  }
};
