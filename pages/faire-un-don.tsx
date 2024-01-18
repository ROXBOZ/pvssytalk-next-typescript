import { GetStaticProps } from "next";
import { InfoPageDetail } from "../types";
import { PortableText } from "@portabletext/react";
import React from "react";
import { getStaticPropsDonatePage } from "../utils/dataFetching";

const DonatePage = ({ DonatePage }: { DonatePage: InfoPageDetail[] }) => {
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
