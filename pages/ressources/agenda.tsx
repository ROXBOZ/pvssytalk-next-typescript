import React, { useState } from "react";
import RessourceNav from "../../components/ressourceNav";
import Filters, { pains } from "../../components/reusables/Filters";

type Props = {};

const Agenda = (props: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  return (
    <div>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>
              Agenda <sup>x</sup>
            </h1>
            <RessourceNav />
            <Filters
              filterOptions={pains}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
          <div>
            <p>build agenda</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
