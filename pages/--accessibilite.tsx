import { InfoPageDetail } from "../types";
import { PortableText } from "@portabletext/react";
import React from "react";
import { client } from "../config/sanity/client";

const AccessibilityPage = ({
  AccessibilityPage,
}: {
  AccessibilityPage: InfoPageDetail[];
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
export const getStaticProps = async () => {
  try {
    const AccessibilityPage: InfoPageDetail = await client.fetch(
      '*[_type == "page" && _id== "d51ad2a1-f2ca-435c-a9bf-1166d9616831" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { AccessibilityPage },
    };
  } catch (error) {
    console.error("Error fetching AccessibilityPage:", error);
    return {
      props: { AccessibilityPage: [] },
    };
  }
};
