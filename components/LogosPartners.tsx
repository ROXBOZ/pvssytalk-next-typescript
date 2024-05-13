import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../config/sanity/client";

const LogoFigure = ({ index, logo }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <figure
      key={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {logo.logoMono && logo.logoColor ? (
        <Image
          loading="lazy"
          src={
            isHovered
              ? urlFor(logo.logoColor.asset._ref).url()
              : urlFor(logo.logoMono.asset._ref).url()
          }
          width={300}
          height={100}
          alt={logo.name}
        />
      ) : (
        <div className="placeholder">
          <span>{logo.name}</span>
        </div>
      )}
    </figure>
  );
};

function LogosPartners({ logos }: any) {
  return (
    <div className="logos-partners-section snap-section">
      <div className="logos-partners-container">
        {logos &&
          logos.map((logo: any, index: number) => {
            if (logo.url) {
              return (
                <Link
                  key={index}
                  href={logo.url}
                  target="_blank"
                  style={{ border: "0" }}
                >
                  <LogoFigure key={index} index={index} logo={logo} />
                </Link>
              );
            } else {
              return <LogoFigure key={index} index={index} logo={logo} />;
            }
          })}
      </div>
    </div>
  );
}

export default LogosPartners;
