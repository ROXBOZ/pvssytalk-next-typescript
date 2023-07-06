import React from "react";
import { GetStaticProps } from "next";
import { getStaticPropsAccessibilityPage } from "../utils/dataFetching";
import { PageDetail } from "../types";
import { PortableText } from "@portabletext/react";

const AccessibilityPage = ({
  AccessibilityPage,
}: {
  AccessibilityPage: PageDetail[];
}) => {
  let a11y = AccessibilityPage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{a11y.title}</h1>
        </div>
        <div>
          <PortableText value={a11y.subtitle as any} />
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
export const getStaticProps: GetStaticProps = getStaticPropsAccessibilityPage;
