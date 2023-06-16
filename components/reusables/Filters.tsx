import React from "react";

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
  "Genève",
  "Vaud",
  "Neuchâtel",
  "Jura",
  "Fribourg",
  "Valais",
];

export const mediaCategories: { title: string; value: string }[] = [
  { title: "Livres/BD", value: "livres" },
  { title: "Articles", value: "articles" },
  { title: "Podcasts", value: "podcasts" },
  { title: "Vidéos/Films", value: "videos" },
  { title: "Porno éthique et féministe", value: "porno" },
];

type Props = {
  filterOptions: FilterOption[];
  selectedFilter: FilterOption | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterOption | null>>;
};

const Filters = ({
  filterOptions,
  selectedFilter,
  setSelectedFilter,
}: Props) => {
  const handleFilter = (filter: FilterOption) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

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
