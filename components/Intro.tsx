import { PortableText } from "@portabletext/react";
import React from "react";

const Intro = ({ intro }: any) => {
  return (
    <div className="double-column-container">
      <div>
        <h2>{intro.pitch}</h2>
      </div>
      <div className="bigger-text">
        <PortableText value={intro.text as any} />
      </div>
    </div>
  );
};

export default Intro;
