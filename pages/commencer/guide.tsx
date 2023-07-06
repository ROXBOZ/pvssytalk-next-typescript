import React from "react";
import { GetStaticProps } from "next";
import { PageDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import { getStaticPropsGuidePage } from "../../utils/dataFetching";

const GuidePage = ({ GuidePage }: { GuidePage: PageDetail[] }) => {
  let guide = GuidePage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{guide.title}</h1>
          <p style={{ color: "red" }}>start nav</p>
        </div>
        <div>
          <PortableText value={guide.subtitle as any} />
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
export const getStaticProps: GetStaticProps = getStaticPropsGuidePage;
