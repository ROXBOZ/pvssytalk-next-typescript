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
  const sluglify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/à/g, "a")
      .replace(/é/g, "e")
      .replace(/è/g, "e")
      .replace(/ü/g, "u")
      .replace(/ï/g, "i")
      .replace(/ê/g, "e")
      .replace(/ù/g, "u")
      .replace(/'/g, "-")
      .replace(/’/g, "-")
      .replace(/œ/g, "oe");
  };
  return (
    <div className="glossary-container">
      {letters.map((letter) => (
        <div className="letter-title" key={letter}>
          <p id={letter} className="h1">
            {letter}
            {letter.toLowerCase()}
          </p>
          {termGroups[letter].map((term: any) => (
            <div
              id={sluglify(term.term)}
              className="glossary-term"
              key={term._id}
            >
              <h2 className="h3 term-entry" style={{ marginTop: "revert" }}>
                {term.term}
              </h2>
              <PortableText value={term.def as any} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GlossaryLayout;
