import React, { useState } from "react";

export const pains = [
  "Sur quelle douleur souhaites-tu t’informer ?",
  "vaginisme",
  "endométriose",
  "syndrome des ovaires polykystiques",
  "lichen scléreux",
  "vaginite et mycose",
  "sécheresse vaginale",
  "utérus rétroversé",
  "vulvodynie",
];

export const bodyParts = [
  "Dans quelles régions de ta vulve ou dans quelles circonstances as-tu mal ?",
  "vulve",
  "vagin",
  "utérus",
  "règles",
];

export const cantons = [
  "Dans quelle région es-tu ?",
  "genève",
  "vaud",
  "neuchâtel",
  "jura",
  "fribourg",
  "valais",
];

export const mediaCategories = [
  "Par quel type de médias souhaites-tu t’informer ?",
  "livres/BD",
  "articles",
  "podcasts",
  "vidéos/films",
  "porno éthique et féministe",
];

type Props = {
  filterOptions: string[];
};

const Filters = ({ filterOptions }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilter = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const handleReset = () => {
    setSelectedFilter(null);
  };

  return (
    <div className="filters-container">
      <p className="filters-title">{filterOptions[0]}</p>
      <div className="filters-content">
        {filterOptions.slice(1).map((filter: string, index: number) => (
          <span
            key={index}
            className={`filter ${selectedFilter === filter ? "active" : ""}`}
            onClick={() => handleFilter(filter)}
          >
            {filter}
          </span>
        ))}
        <span className="reset" onClick={handleReset}>
          ✕ reset
        </span>
      </div>
    </div>
  );
};

export default Filters;
