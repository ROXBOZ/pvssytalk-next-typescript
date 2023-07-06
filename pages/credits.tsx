import React from "react";
import { GetStaticProps } from "next";
import { getStaticPropsCreditPage } from "../utils/dataFetching";
import { PageDetail } from "../types";

const CreditPage = ({ CreditPage }: { CreditPage: PageDetail[] }) => {
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
