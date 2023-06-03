import React from "react";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <span className="logo">
        pvssy talk <sup>beta</sup>
      </span>
      <nav>
        <Link href="/">Accueil</Link>
        <Link href="agenda">Agenda</Link>
        <Link href="faire-un-don">Faire un don</Link>
        <Link href="devenir-membre">Devenir membre</Link>
        <Link href="se-connecter">Se connecter</Link>
      </nav>
    </header>
  );
};

export default Header;
