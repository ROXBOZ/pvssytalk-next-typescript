import { InfoPageDetail } from "../../types";
import { InfoPageHeader } from "../../components/reusables/InfoPageHeader";
import InfoPageSection from "../../components/reusables/InfoPageSections";
import React from "react";
import { client } from "../../config/sanity/client";

const GuidePage = ({ GuidePage }: { GuidePage: InfoPageDetail[] }) => {
  let guide = GuidePage[0];
  return (
    <>
      <InfoPageHeader data={guide} />
      <InfoPageSection data={guide.sections} />
    </>
  );
};

export default GuidePage;
export const getStaticProps = async () => {
  try {
    const GuidePage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "907c981f-c463-415c-b975-6a14971575e1" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { GuidePage },
    };
  } catch (error) {
    console.error("Error fetching GuidePage:", error);
    return {
      props: { GuidePage: [] },
    };
  }
};
