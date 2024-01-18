import { GetStaticProps } from "next";
import { InfoPageDetail } from "../types";
import { PortableText } from "@portabletext/react";
import React from "react";
import { getStaticPropsMembersPage } from "../utils/dataFetching";

const MembersPage = ({ MembersPage }: { MembersPage: InfoPageDetail[] }) => {
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
