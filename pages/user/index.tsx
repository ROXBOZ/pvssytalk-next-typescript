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
                  <p>
                    Vous êtes connecté·e avec{" "}
                    <strong>{existingUserCredential.email}</strong> et avec la
                    fonction d’<strong>admin</strong>.{" "}
                  </p>
                  <button onClick={logout}>
                    <span>Changer de compte</span>
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
                <span>
                  <a href="se-connecter">Connectez-vous</a> pour accéder à cette
                  page.
                </span>
              </main>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
