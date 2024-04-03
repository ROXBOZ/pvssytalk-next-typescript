import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import React from "react";
import { urlFor } from "../../config/sanity/client";

function TextImageBlock({ data }: any) {
  return (
    <div
      className={`snap-section textImageBlock-wrapper ${
        data.color === "primary"
          ? "primary"
          : data.color === "secondary"
          ? "secondary"
          : data.color === "tierary"
          ? "tierary"
          : ""
      }`}
    >
      <div className="textImageBlock">
        <div className="text-container bigger-text">
          <h2>{data.title}</h2>
          <PortableText value={data.text as any} />
          {data.callToAction && (
            <Link href={data.callToAction.link.slug.current}>
              <button className="primary-button">
                {data.callToAction.label}
              </button>
            </Link>
          )}
        </div>

        <div className="image-container">
          <Image
            src={urlFor(data.figure.image.asset).url()}
            width={1000}
            height={1000}
            alt={data.figure.altText}
          />
        </div>
      </div>
    </div>
  );
}

export default TextImageBlock;
