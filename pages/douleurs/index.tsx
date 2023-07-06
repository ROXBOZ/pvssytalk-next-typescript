import React from "react";
import PainGrid from "../../components/PainGrid";
import { PainDetails } from "../../types";
import { getStaticPropsPains } from "../../utils/dataFetching";
import { GetStaticProps } from "next";

type Props = {
  pains: PainDetails;
};

const Pains = ({ pains }: Props) => {
  return <PainGrid pains={pains} />;
};

export default Pains;
export const getStaticProps: GetStaticProps = getStaticPropsPains;
