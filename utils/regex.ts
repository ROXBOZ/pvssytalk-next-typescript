export const regexTerm = (term: string) => {
  return term
    .replace(/\s+/g, "-")
    .replace(/é/g, "e")
    .replace(/è/g, "e")
    .replace(/œ/g, "oe")
    .toLowerCase();
};
