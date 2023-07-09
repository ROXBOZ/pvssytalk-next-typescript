import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

type Props = {};

const User = (props: Props) => {
  const { existingUserCredential, logout } = useContext(AuthContext);
  console.log("existingUserCredential :", existingUserCredential);
  return (
    <>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>
              Compte <sup>admin</sup>
            </h1>
            {existingUserCredential &&
              existingUserCredential.emailVerified === true && (
                <>
                  <nav className="nav-directory">
                    <a href="">Gérer l’agenda</a>
                    <a href="">Gérer l’annuaire</a>
                  </nav>
                  <p>
                    Vous êtes connecté·e avec{" "}
                    <strong>{existingUserCredential.email}</strong> et avez la
                    fonction d’<strong>admin</strong>.{" "}
                  </p>
                  <button onClick={logout}>
                    <span>Déconnexion</span>
                  </button>
                </>
              )}
          </div>
          <div>
            {existingUserCredential &&
            existingUserCredential.emailVerified === true ? (
              <p>this is protected</p>
            ) : (
              <main>
                <p className="msg warning">
                  <a href="se-connecter">Connectez-vous</a> pour accéder à cette
                  page.
                </p>
              </main>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
