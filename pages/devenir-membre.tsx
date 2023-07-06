import React from "react";
import { GetStaticProps } from "next";
import { getStaticPropsMembersPage } from "../utils/dataFetching";
import { PageDetail } from "../types";
import { PortableText } from "@portabletext/react";

const MembersPage = ({ MembersPage }: { MembersPage: PageDetail[] }) => {
  let members = MembersPage[0];

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>{members.title}</h1>
        </div>
        <div>
          <PortableText value={members.subtitle as any} />
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
export const getStaticProps: GetStaticProps = getStaticPropsMembersPage;
