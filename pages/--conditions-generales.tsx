import { GetStaticProps } from "next";
import { InfoPageDetail } from "../types";
import React from "react";
import { getStaticPropsConditionsPage } from "../utils/dataFetching";

const ConditionsPage = ({
  ConditionsPage,
}: {
  ConditionsPage: InfoPageDetail[];
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
