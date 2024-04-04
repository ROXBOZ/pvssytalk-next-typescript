import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../config/sanity/client";

function LinkCards({ data }: any) {
  console.log("data :", data);
  return (
    <>
      <div className="double-column-container" style={{ marginBottom: "0" }}>
        <div>
          <h2>{data.title}</h2>
        </div>
      </div>
      <div className="cards-container">
        {data.cards &&
          data.cards.map((card: any, index: number) => {
            console.log("card :", card);
            return (
              <div className="card" key={index}>
                <Link href="" passHref>
                  <div className="card-content">
                    <div className="card-image-container">
                      {card.figure && (
                        <Image
                          className="card-image"
                          src={urlFor(card.figure.image.asset._ref).url()}
                          width={500}
                          height={300}
                          alt={card.figure.altText}
                        />
                      )}
                    </div>
                    <div className="text-container">
                      <div>
                        <h3>{card.title}</h3>
                        <p style={{ marginTop: "0" }}>{card.description}</p>
                      </div>
                      {card.linkType === "page" ? (
                        <button className="secondary-button">
                          {card.label}
                        </button>
                      ) : card.linkType === "ressource" ? (
                        <button className="secondary-button">
                          {card.label}
                        </button>
                      ) : card.linkType === "typeform" ? (
                        <button className="secondary-button">
                          {card.label}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default LinkCards;
