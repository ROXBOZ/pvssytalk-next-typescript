import Link from "next/link";
import React from "react";

const Marquee = ({ marquee }: any) => {
  return (
    <div className="marquee">
      <p>{marquee.text}</p>
      <Link
        style={{ border: "0" }}
        href={marquee.callToAction.link}
        target="_blank"
      >
        <button>{marquee.callToAction.label}</button>
      </Link>
    </div>
  );
};

export default Marquee;
