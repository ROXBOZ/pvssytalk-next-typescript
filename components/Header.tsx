import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../context/authContext";

type Props = {};

const Header = (props: Props) => {
  const { existingUserCredential, logout } = useContext(AuthContext);

  return (
    <header>
      <Link href="/" className="borderless">
        <span className="logo nowrap">
          pvssy talk <sup>beta</sup>
        </span>
      </Link>
      <nav>
        <Link href="/#start">Par où commencer</Link>
        <Link href="/ressources/agenda">Agenda</Link>
        <Link href="/faire-un-don">Faire un don</Link>
        <Link href="/devenir-membre">Devenir membre</Link>
        <Link href="/a-propos">À propos</Link>
        {!existingUserCredential ? (
          <Link href="/se-connecter">Connexion</Link>
        ) : (
          <>
            <Link className="colored" href="/editor">
              Editor
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
