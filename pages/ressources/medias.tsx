import React from "react";
import RessourceNav from "../../components/ressourceNav";

type Props = {};

const Medias = (props: Props) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Médias</h1>
          <RessourceNav />
        </div>
      </div>
    </div>
  );
};

export default Medias;
