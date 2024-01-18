import { GetStaticProps } from "next";
import { InfoPageDetail } from "../types";
import React from "react";
import { getStaticPropsCreditPage } from "../utils/dataFetching";

const CreditPage = ({ CreditPage }: { CreditPage: InfoPageDetail[] }) => {
  let credit = CreditPage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{credit.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default CreditPage;
export const getStaticProps: GetStaticProps = getStaticPropsCreditPage;
