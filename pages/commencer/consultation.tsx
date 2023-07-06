import React from "react";
import { GetStaticProps } from "next";
import { PageDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import { getStaticPropsConsultPage } from "../../utils/dataFetching";

const ConsultPage = ({ ConsultPage }: { ConsultPage: PageDetail[] }) => {
  let consult = ConsultPage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{consult.title}</h1>
        </div>
        <div>
          <PortableText value={consult.subtitle as any} />
        </div>
      </div>
    </div>
  );
};

export default ConsultPage;
export const getStaticProps: GetStaticProps = getStaticPropsConsultPage;
