import React from "react";
import { PainDetail } from "../../../types";

const painGlossary = ({ pain }: { pain: PainDetail }) => {
  console.log("pain :", pain);
  return <>{/* <h1>Glossaire {pain.name} </h1> */}</>;
};

export default painGlossary;
