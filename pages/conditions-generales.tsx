import React from "react";
import { GetStaticProps } from "next";
import { getStaticPropsConditionsPage } from "../utils/dataFetching";
import { PageDetail } from "../types";

const ConditionsPage = ({
  ConditionsPage,
}: {
  ConditionsPage: PageDetail[];
}) => {
  let cguv = ConditionsPage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{cguv.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ConditionsPage;
export const getStaticProps: GetStaticProps = getStaticPropsConditionsPage;
