import Link from "next/link";
import { PortableText } from "@portabletext/react";
import React from "react";

const Marquee = ({ marquee }: any) => {
  return (
    <div className="marquee">
      <div className="content">
        <PortableText value={marquee[0].marquee.text as any} />
      </div>

      <Link
        style={{ border: "0" }}
        href={marquee[0].marquee.callToAction.link}
        target="_blank"
      >
        <button>{marquee[0].marquee.callToAction.label}</button>
      </Link>
    </div>
  );
};

export default Marquee;
