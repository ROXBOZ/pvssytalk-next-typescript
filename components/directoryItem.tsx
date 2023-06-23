import React from "react";
import { DirectoryDetail } from "../types";
import { cleanUrl } from "../utils/cleanUrl";

export default function DirectoryItem({
  contact,
}: {
  contact: DirectoryDetail;
}) {
  return (
    <>
      <div className="directory-item" key={contact._id}>
        <span> {contact.category}</span>
        <h2 className="h4">
          {contact.firstName} {contact.name}
        </h2>
        <p>
          <em>
            {contact.tagline && <em>{contact.tagline}</em>}
            {contact.profession && <em>{contact.profession}</em>}
          </em>
        </p>
        <>
          {contact.addresses?.map((a) => (
            <p key={a._key}>
              <span>{a.address}</span>
              <br />
              <a href={`tel: ${a.phone}`}>{a.phone}</a>
            </p>
          ))}
        </>

        {contact.email && (
          <>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
          </>
        )}

        {contact.url && (
          <a href={contact.url} target="_blank">
            {cleanUrl(contact.url)}
          </a>
        )}
      </div>
    </>
  );
}
