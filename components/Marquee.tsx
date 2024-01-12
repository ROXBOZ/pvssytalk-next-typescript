import Link from "next/link";
import React from "react";

const Marquee = () => {
  return (
    <div className="marquee">
      <p>
        Nous travaillons sur un annuaire de soignant·esx en Suisse Romande. Si
        tu connais des practicien·nexs <em>safe</em>, tu peux nous envoyer un
        email à{" "}
        <Link href="mailto:hello@pvssy-talk.org">hello@pvssy-talk.org</Link>.
        Nous travaillons sur un annuaire de soignant·esx en Suisse Romande. Si
        tu connais des practicien·nexs <em>safe</em>, tu peux nous envoyer un
        email à{" "}
        <Link href="mailto:hello@pvssy-talk.org">hello@pvssy-talk.org</Link>.
      </p>
    </div>
  );
};

export default Marquee;
