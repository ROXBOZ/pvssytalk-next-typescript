import { DirectoryDetail } from "../types";
import Link from "next/link";
import React from "react";
import { cleanUrl } from "../utils/cleanUrl";

function DirectoryItem({ contact }: { contact: DirectoryDetail }) {
  return (
    <>
      <div className="directory-item" key={contact._id}>
        <div>
          <div>
            <div className="directory-item-title">
              <h3>
                {contact.firstName} {contact.name}
              </h3>
              <div className="tag-container">
                {contact.profession ? (
                  <span className="tag">{contact.profession.name}</span>
                ) : contact.category === "website" ? (
                  <span className="tag">online</span>
                ) : (
                  ""
                )}

                {contact.addresses?.map((address: any) =>
                  address.region ? (
                    <span key={address.id} className="tag">
                      {address.region}
                    </span>
                  ) : null
                )}
              </div>
            </div>
            <p className="directory-item-subtitle">{contact.subtitle}</p>
          </div>

          <div className="directory-item-content-container">
            <div className="col1">
              <div>
                {(contact.email || contact.url) && <h4>Contact</h4>}

                {contact.email && (
                  <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                )}
                {contact.url && (
                  <>
                    <br />
                    <Link href={contact.url} target="_blank">
                      {cleanUrl(contact.url)}
                    </Link>
                  </>
                )}
              </div>
              <div>
                {contact.addresses && contact.category === "specialist" ? (
                  <h4>Lieux de consultations</h4>
                ) : (
                  contact.addresses && <h4>Adresses</h4>
                )}
                {contact.addresses?.map((a) => {
                  return (
                    <div className="directory-item-address" key={a._key}>
                      <span>{a.address}</span>
                      <br />
                      {a.phoneIndicator && a.phone && (
                        <Link
                          href={`tel:${a.phoneIndicator}${a.phone
                            .substring(1)
                            .replace(/\s/g, "")}`}
                        >
                          {a.phone}
                        </Link>
                      )}
                      <br />
                      <div
                        className="tag-container"
                        style={{ margin: "1rem 0" }}
                      >
                        {a.accessibility &&
                          a.accessibility.map((tag: any, index: number) => {
                            return (
                              <div className="tag" key={index}>
                                <span>{tag.name}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                {contact.pricing && (
                  <div>
                    {contact.pricing.pricingMin && (
                      <h4>Tarifs de consultation</h4>
                    )}

                    {contact.pricing && (
                      <p>
                        {(contact.pricing.pricingMin ||
                          contact.pricing.pricingMax) && <span>CHF </span>}
                        {contact.pricing.pricingMin &&
                          contact.pricing.pricingMin}
                        {contact.pricing.pricingMax && (
                          <span>-{contact.pricing.pricingMax}</span>
                        )}
                        {(contact.pricing.pricingMin ||
                          contact.pricing.pricingMax) && <span>.-</span>}
                      </p>
                    )}

                    {contact.pricing.isReimbursed === true &&
                      contact.pricing.isReimbursedComp === false && (
                        <div className="tag">
                          <span>remboursé par l’assurance de base</span>
                        </div>
                      )}
                    {contact.pricing.isReimbursedComp === true && (
                      <div className="tag">
                        <span>remboursé par la complémentaire</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              {contact.recommendations && <h4>Recommendations</h4>}
              <div className="tag-container">
                {contact.recommendations &&
                  contact.recommendations.map((tag: any, index: number) => {
                    return (
                      <div className="tag" key={index}>
                        <span>{tag.name}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DirectoryItem;
