import { GetStaticPaths, GetStaticProps } from "next";
import { GlossaryDetail, GlossaryDetails, PainDetail } from "../../../types";
import {
  getStaticPathsPain,
  getStaticPropsPainGlossary,
} from "../../../utils/dataFetching";

import { PortableText } from "@portabletext/react";
import React from "react";
import ResourcePageLayout from "../../../components/reusables/ResourcePageLayout";

const painGlossary = ({
  glossary,
  pain,
}: {
  pain: PainDetail;
  glossary: GlossaryDetails;
}) => {
  const sortedGlossary = glossary.sort((a, b) => a.term.localeCompare(b.term));

  const termAnchor = (term: string) => {
    return term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace("œ", "oe")
      .toLowerCase();
  };

  return (
    <ResourcePageLayout
      pageName="Glossaire"
      pain={pain}
      relatedContent={sortedGlossary}
    >
      <div>
        <div>
          {sortedGlossary.map((term: GlossaryDetail) => {
            return (
              <div id={termAnchor(term.term)} key={term._id}>
                <h2 className="h3">{term.term}</h2>
                <PortableText value={term.def as any} />
              </div>
            );
          })}
        </div>
      </div>
    </ResourcePageLayout>
  );
};
export const getStaticProps: GetStaticProps = getStaticPropsPainGlossary;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
export default painGlossary;
