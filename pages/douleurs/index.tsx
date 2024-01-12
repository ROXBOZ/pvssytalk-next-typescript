import { GetStaticProps } from "next";
import { PainDetail } from "../../types";
import PainGrid from "../../components/PainGrid";
import React from "react";
import { getStaticPropsPains } from "../../utils/dataFetching";

type Props = {
  pains: PainDetail[];
};

const Pains = ({ pains }: Props) => {
  return <PainGrid pains={pains} />;
};

export default Pains;
export const getStaticProps: GetStaticProps = getStaticPropsPains;
