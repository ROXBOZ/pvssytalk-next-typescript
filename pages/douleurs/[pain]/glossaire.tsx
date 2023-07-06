import React from "react";
import { GlossaryDetail, PainDetail, GlossaryDetails } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { PortableText } from "@portabletext/react";
import PainNav from "../../../components/painNav";
import {
  getStaticPathsPain,
  getStaticPropsPainGlossary,
} from "../../../utils/dataFetching";

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
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>
            Glossaire{" "}
            <a href="./" className="colored logo">
              {pain.name}
            </a>
             <sup className="no-color">{glossary.length}</sup>
          </h1>
          <PainNav pain={pain} />
        </div>
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
    </div>
  );
};
export const getStaticProps: GetStaticProps = getStaticPropsPainGlossary;
export const getStaticPaths: GetStaticPaths = getStaticPathsPain;
export default painGlossary;
