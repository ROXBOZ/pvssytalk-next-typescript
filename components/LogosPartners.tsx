import Image from "next/image";
import React from "react";
import { urlFor } from "../config/sanity/client";

function LogosPartners({ logos }: any) {
  return (
    <div className="logos-partners-section">
      <div className="logos-partners-container">
        {logos &&
          logos.map((logo: any) => {
            return (
              <figure>
                <div className="color-screen" />
                {logo.logo ? (
                  <Image
                    src={urlFor(logo.logo.asset._ref).url()}
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
          })}
      </div>
    </div>
  );
}

export default LogosPartners;
