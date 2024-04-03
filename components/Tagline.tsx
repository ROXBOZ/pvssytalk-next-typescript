import React from "react";

const Tagline = ({ tagline }: any) => {
  return (
    <div className="tagline">
      <div className="gradient" />
      <div className="content">
        <h1>{tagline}</h1>
      </div>
    </div>
  );
};

export default Tagline;
