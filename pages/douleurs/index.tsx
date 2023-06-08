import React from "react";
import { client } from "../../utils/sanity/client";
import PainGrid from "../../components/reusables/PainGrid";
import { PainDetails } from "../../types";

type Props = {
  pains: PainDetails;
};

const Pains = ({ pains }: Props) => {
  return <PainGrid pains={pains} />;
};

export default Pains;

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
