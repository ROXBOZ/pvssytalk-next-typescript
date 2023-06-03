import React from "react";
import Filters, { bodyParts, pains } from "../../components/reusables/Filters";

type Props = {};

const Pains = (props: Props) => {
  return (
    <>
      <h2>Mieux connaître ses douleurs</h2>
      <p>
        Chaque douleur est traitée avec une approche à la fois médicale et
        sexologique pour te donner une vision complète. Tu trouveras également
        des ressources pour aller plus loin.
      </p>
      <Filters filterOptions={bodyParts} />
      Grid douleurs
    </>
  );
};

export default Pains;
