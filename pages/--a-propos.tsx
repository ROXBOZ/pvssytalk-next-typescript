import { GetStaticProps } from "next";
import { InfoPageDetail } from "../types";
import { PortableText } from "@portabletext/react";
import React from "react";
import { getStaticPropsAboutPage } from "../utils/dataFetching";

const AboutPage = ({ AboutPage }: { AboutPage: InfoPageDetail[] }) => {
  let about = AboutPage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{about.title}</h1>
        </div>
        <div>
          <PortableText value={about.subtitle as any} />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
export const getStaticProps: GetStaticProps = getStaticPropsAboutPage;
