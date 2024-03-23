import React, { useState } from "react";

import Link from "next/link";
import { PortableText } from "@portabletext/react";

const Marquee = ({ marquee }: any) => {
  const [isClosed, setIsClosed] = useState(false);
  return (
    <div className={`marquee ${isClosed && "closed"}`}>
      <span
        className="close-button"
        onClick={() => {
          setIsClosed(true);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </span>
      <div className="content">
        <PortableText value={marquee[0].marquee.text as any} />
        <Link
          style={{ border: "0" }}
          href={marquee[0].marquee.callToAction.link}
          target="_blank"
        >
          <button>{marquee[0].marquee.callToAction.label}</button>
        </Link>
      </div>
    </div>
  );
};

export default Marquee;
