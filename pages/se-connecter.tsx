import React, { useContext, useEffect, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {};

const Login = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loginError, existingUserCredential } = useContext(AuthContext);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e: any) => {
    e.preventDefault();
    login(email, password);
  };
  const seePassword = (e: any) => {
    e.preventDefault();
    setIsVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (
      existingUserCredential &&
      existingUserCredential.emailVerified === true
    ) {
      setTimeout(() => {
        router.push("/editor");
      }, 1500);
    }
  }, [existingUserCredential, router]);

  console.log("existingUserCredential :", existingUserCredential);
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Se connecter</h1>
          <nav className="nav-directory">
            <Link href="creer-un-compte">Créer un compte</Link>
          </nav>
        </div>
        <div>
          {" "}
          <form>
            <div className="form-section">
              <label htmlFor="email" className="required">
                <span>Email</span>
              </label>
              <div className="input-section">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleEmailChange}
                  required
                />
                {email &&
                password &&
                (!email.includes("@") || !email.includes(".")) ? (
                  <span className="smaller-text colored">invalide</span>
                ) : null}
              </div>
            </div>

            <div className="form-section">
              <label htmlFor="password" className="required">
                <span>Mot de passe</span>
              </label>
              <div className="input-section">
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="Mot de passe"
                  name="password"
                  onChange={handlePasswordChange}
                  required
                />
                <button className="showPassword" onClick={seePassword}>
                  <FontAwesomeIcon
                    id="eye-icon"
                    icon={!isVisible ? faEye : faEyeSlash}
                  />
                </button>
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
              <button
                onClick={handleLogin}
                disabled={
                  !(
                    email &&
                    email.includes("@") &&
                    email.includes(".") &&
                    password.length >= 6
                  )
                }
              >
                <span>Se connecter</span>
              </button>
              <Link href="reset-mot-de-passe">
                <span>Mot de passe oublié ?</span>
              </Link>{" "}
              <Link href="creer-un-compte">Pas encore de compte ?</Link>
            </div>

            {loginError === "Firebase: Error (auth/wrong-password)." && (
              <p className="msg error">
                {" "}
                <span>Mot de passe incorrect.</span>
              </p>
            )}
            {existingUserCredential &&
              existingUserCredential.emailVerified === true && (
                <div>
                  <span className="msg success">
                    Connexion réussie ! Redirection
                  </span>
                </div>
              )}
            {existingUserCredential &&
              existingUserCredential.emailVerified === false && (
                <div>
                  <span className="msg error">
                    Vérifiez votre adresse email et réessayez.
                  </span>
                </div>
              )}
            {loginError === "Firebase: Error (auth/user-not-found)." && (
              <p className="msg warning">
                <span>Il n’existe pas de compte avec cet email. </span>
                <Link href="creer-un-compte">Créer un compte</Link>.
              </p>
            )}

            {loginError ===
              "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." && (
              <p>
                <span>
                  L'accès à ce compte a été temporairement désactivé en raison
                  de nombreuses tentatives de connexion échouées. Vous pouvez le
                  réactiver immédiatement en{" "}
                  <Link href="reset-mot-de-passe">
                    réinitialisant votre mot de passe
                  </Link>
                  , ou vous pouvez réessayer ultérieurement.
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
