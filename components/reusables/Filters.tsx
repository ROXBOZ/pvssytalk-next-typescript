import React, { useState } from "react";

type FilterOption = string;

export const pains: FilterOption[] = [
  "Sur quelle douleur souhaites-tu t’informer ?",
  "vaginisme",
  "endométriose",
  "syndrome des ovaires polykystiques",
  "lichen scléreux",
  "vaginite et mycose",
  "sécheresse vaginale",
  "utérus rétroversé",
  "vulvodynie",
];

export const bodyParts: FilterOption[] = [
  "Dans quelles régions de ta vulve ou dans quelles circonstances as-tu mal ?",
  "vulve",
  "vagin",
  "utérus",
  "règles",
];

export const cantons: FilterOption[] = [
  "Dans quelle région es-tu ?",
  "genève",
  "vaud",
  "neuchâtel",
  "jura",
  "fribourg",
  "valais",
];

export const mediaCategories: FilterOption[] = [
  "Par quel type de médias souhaites-tu t’informer ?",
  "livres/BD",
  "articles",
  "podcasts",
  "vidéos/films",
  "porno éthique et féministe",
];

type Props = {
  filterOptions: FilterOption[];
};

const Filters = ({ filterOptions }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );

  const handleFilter = (filter: FilterOption) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  console.log("selectedFilter :", selectedFilter);

  const handleReset = () => {
    setSelectedFilter(null);
  };

  return (
    <div className="filters-container">
      <p className="filters-title">{filterOptions[0]}</p>
      <div className="filters-content">
        {filterOptions.slice(1).map((filter: FilterOption, index: number) => (
          <span
            key={index}
            className={`filter ${selectedFilter === filter ? "active" : ""}`}
            onClick={() => handleFilter(filter)}
          >
            {filter}
          </span>
        ))}
        <span className="reset" onClick={handleReset}>
          ✕ reset
        </span>
      </div>
    </div>
  );
};

export default Filters;
