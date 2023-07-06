import React from "react";
import { GetStaticProps } from "next";
import { PageDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import { getStaticPropsIntroPage } from "../../utils/dataFetching";

const IntroPage = ({ IntroPage }: { IntroPage: PageDetail[] }) => {
  let intro = IntroPage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{intro.title}</h1>
        </div>
        <div>
          <PortableText value={intro.subtitle as any} />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
export const getStaticProps: GetStaticProps = getStaticPropsIntroPage;
