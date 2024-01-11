import Image from "next/image";
import { InfoPageDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import StartNav from "../startNav";
import { urlFor } from "../../config/sanity/client";

export const InfoPageHeader = ({ data }: { data: InfoPageDetail }) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{data.title}</h1>
          <StartNav />
          {data.image && (
            <Image
              className="intro-image"
              src={urlFor(data.image.asset._ref).url()}
              width={500}
              height={300}
              alt={data.image.alternativeText}
            />
          )}
        </div>
        <div className="bigger-text">
          <PortableText value={data.subtitle as any} />
        </div>
      </div>
    </div>
  );
};
