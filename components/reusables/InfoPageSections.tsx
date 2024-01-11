import Image from "next/image";
import { PortableText } from "@portabletext/react";
import React from "react";
import { urlFor } from "../../config/sanity/client";

interface InfoPageSectionProps {
  sectionTitle: string;
  sectionContent: any;
  sectionImage?: {
    asset: any;
    alternativeText: string;
  };
}

const InfoPageSection = ({ data }: { data: InfoPageSectionProps[] }) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        {data.map((section, index: number) => {
          return (
            <div key={index}>
              <div style={{ border: "2px solid red" }}>
                <h2>{section.sectionTitle}</h2>
                {section.sectionImage && (
                  <Image
                    className={section.sectionTitle}
                    src={urlFor(section.sectionImage.asset._ref).url()}
                    width={500}
                    height={300}
                    alt={section.sectionImage.alternativeText}
                  />
                )}
              </div>
              <div style={{ border: "2px solid blue" }}>
                <PortableText value={section.sectionContent as any} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoPageSection;
