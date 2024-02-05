import { PortableText } from "@portabletext/react";
import React from "react";

interface GlossaryLayoutProps {
  letters: string[];
  termGroups: { [key: string]: any[] };
}

const GlossaryLayout: React.FC<GlossaryLayoutProps> = ({
  letters,
  termGroups,
}) => {
  return (
    <>
      {letters.map((letter) => (
        <div className="letter-title" key={letter}>
          <p id={letter} className="h1">
            {letter}
            {letter.toLowerCase()}
          </p>
          {termGroups[letter].map((term: any) => (
            <div className="glossary-term" key={term._id}>
              <h2 className="h3 term-entry" style={{ marginTop: "revert" }}>
                {term.term}
              </h2>
              <PortableText value={term.def as any} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default GlossaryLayout;
