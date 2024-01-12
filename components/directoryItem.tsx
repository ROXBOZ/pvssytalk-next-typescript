import { DirectoryDetail } from "../types";
import Link from "next/link";
import React from "react";
import { cleanUrl } from "../utils/cleanUrl";

export default function DirectoryItem({
  contact,
}: {
  contact: DirectoryDetail;
}) {
  return (
    <>
      <div className="directory-item" key={contact._id}>
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
              <Link href={`tel: ${a.phone}`}>{a.phone}</Link>
            </p>
          ))}
        </>

        {contact.email && (
          <>
            <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
            <br />
          </>
        )}

        {contact.url && (
          <Link href={contact.url} target="_blank">
            {cleanUrl(contact.url)}
          </Link>
        )}
      </div>
    </>
  );
}
