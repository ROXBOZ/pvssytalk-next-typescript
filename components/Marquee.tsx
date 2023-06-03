import React from "react";

type Props = {};

const Marquee = (props: Props) => {
  return (
    <div className="marquee">
      Nous travaillons sur un annuaire de soignant·esx en Suisse Romande. Si tu
      connais des practicien·nexs <em>safe</em>, tu peux nous envoyer un email à{" "}
      <a href="mailto:hello@pvssy-talk.org">hello@pvssy-talk.org</a>.
    </div>
  );
};

export default Marquee;
