import { GlossaryDetails } from "../types";
import { websiteURL } from "./urls";

export const highlightText = (approach: any, glossary: GlossaryDetails) => {
  const painTerms = glossary.map((g) => {
    return g.term.toLowerCase();
  });

  return approach.map((section: any) => {
    const children = section.children?.map((child: any) => {
      const part = child.text.toLowerCase();
      const painTermSlug = "";
      return painTerms.includes(part)
        ? {
            ...child,
            marks: ["link"],

            _href: `glossaire/#${painTermSlug}`,
          }
        : child;
    });
    return { ...section, children };
  });
};
