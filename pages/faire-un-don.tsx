import React from "react";
import { GetStaticProps } from "next";
import { getStaticPropsDonatePage } from "../utils/dataFetching";
import { PageDetail } from "../types";
import { PortableText } from "@portabletext/react";

const DonatePage = ({ DonatePage }: { DonatePage: PageDetail[] }) => {
  let donate = DonatePage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{donate.title}</h1>
        </div>
        <div>
          <PortableText value={donate.subtitle as any} />
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
export const getStaticProps: GetStaticProps = getStaticPropsDonatePage;
