import { InfoPageDetail } from "../../types";
import { InfoPageHeader } from "../../components/reusables/InfoPageHeader";
import InfoPageSection from "../../components/reusables/InfoPageSections";
import React from "react";
import { client } from "../../config/sanity/client";

const ConsultPage = ({ ConsultPage }: { ConsultPage: InfoPageDetail[] }) => {
  let consult = ConsultPage[0];
  return (
    <>
      <InfoPageHeader data={consult} />
      <InfoPageSection data={consult.sections} />
    </>
  );
};

export default ConsultPage;
export const getStaticProps = async () => {
  try {
    const ConsultPage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "ecfa6551-18d6-47b7-8315-43043dd7ad5d" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { ConsultPage },
    };
  } catch (error) {
    console.error("Error fetching ConsultPage:", error);
    return {
      props: { ConsultPage: [] },
    };
  }
};
