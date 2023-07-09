import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase/firebase-config";

type Props = {};

const ResetPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handleReset = async (e: any) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess("Password reset email sent");
    } catch (error: any) {
      setResetError(error.message);
    }
  };

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Réinitialiser mot de passe</h1>
          <nav className="nav-directory">
            <a href="creer-un-compte">Créer un compte</a>
            <a href="se-connecter">Se connecter</a>
          </nav>
        </div>
        <div>
          <form>
            <div className="form-section">
              <label htmlFor="email" className="required">
                <span>Adresse email</span>
              </label>
              <div className="input-section">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleEmailChange}
                  required
                />
                {email && (!email.includes("@") || !email.includes(".")) ? (
                  <span className="smaller-text colored">invalide</span>
                ) : null}
              </div>
            </div>

            <div
              //NOTE CREATE CLASS
              style={{
                display: "flex",
                gap: "1rem",
                height: "fit-content",
                alignItems: "baseline",
              }}
            >
              <button onClick={handleReset} disabled={email ? false : true}>
                <span>Envoyer</span>
              </button>{" "}
              {resetSuccess && (
                <p className="msg success">
                  Lien de réinitialisation du mot de passe envoyé par email.
                </p>
              )}
              {email &&
                resetError ===
                  "Firebase: Error (auth/network-request-failed)." && (
                  <p className="msg warning">Une erreur est survenue</p>
                )}
              {email &&
                resetError === "Firebase: Error (auth/user-not-found)." && (
                  <p className="msg warning">
                    Il n’y pas de compte créé avec cette addresse email.
                  </p>
                )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
