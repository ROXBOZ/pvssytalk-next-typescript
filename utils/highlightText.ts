import { GlossaryDetails } from "../types";
import { websiteURL } from "./urls";

export const highlightText = (approach: any, glossary: GlossaryDetails) => {
  const painTerms = glossary.map((g) => {
    return g.term.toLowerCase();
  });

  console.log("painTerms :", glossary);

  return approach.map((section: any) => {
    console.log("approach :", approach);
    const children = section.children?.map((child: any) => {
      const part = child.text.toLowerCase();
      const painTermSlug = "";
      console.log("child :", child);
      return painTerms.includes(part)
        ? {
            _type: "block",
            _key: "09b77a1b27b6",
            style: "normal",
            markDefs: [
              {
                _type: "internalLink",
                _key: "38c5fca2ab61",
                reference: {
                  _type: "reference",
                  _ref: "b4e53349-0d22-47c1-becf-02bf4acac13e",
                },
              },
            ],
            children: [
              {
                _type: "span",
                _key: "09b77a1b27b60",
                text: "Go to this ",
                marks: [],
              },
              {
                _type: "span",
                _key: "09b77a1b27b61",
                text: "post",
                marks: ["38c5fca2ab61"],
              },
              {
                _type: "span",
                _key: "09b77a1b27b62",
                text: " to learn more.",
                marks: [],
              },
            ],
          }
        : // ? {
          //     ...child,
          //     marks: ["link"],
          //     markDefs: [
          //       {
          //         _type: "link",
          //         _key: "e556761904ba",
          //         href: "https://www.portabletext.org",
          //       },
          //     ],
          //     href: `glossaire/#${painTermSlug}`,
          //   }
          child;
    });
    return { ...section, children };
  });
};
