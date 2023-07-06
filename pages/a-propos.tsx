import React from "react";
import { GetStaticProps } from "next";
import { getStaticPropsAboutPage } from "../utils/dataFetching";
import { PageDetail } from "../types";
import { PortableText } from "@portabletext/react";

const AboutPage = ({ AboutPage }: { AboutPage: PageDetail[] }) => {
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
