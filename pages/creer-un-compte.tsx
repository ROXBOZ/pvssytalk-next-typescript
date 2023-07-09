import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { auth } from "../config/firebase/firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import GoogleButton from "react-google-button";

type Props = {};

const Signup = (props: Props) => {
  const [email, setEmail] = useState("");
  // const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const { register, newUserCredential, googleSignIn, registrationError } =
    useContext(AuthContext);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log("error :", error);
    }
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handlePasswordRepeatChange = (e: any) => {
    setPasswordRepeat(e.target.value);
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(auth, email, password);
    setEmail("");
    // setUserName("");
    setPassword("");
    setPasswordRepeat("");
  };
  const seePassword = (e: any) => {
    e.preventDefault();
    setIsVisible((prevState) => !prevState);
  };
  const seePasswordRepeat = (e: any) => {
    e.preventDefault();
    setIsVisibleRepeat((prevState) => !prevState);
  };
  const handleGeneralConditions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(e.target.checked);
  };

  useEffect(() => {
    if (newUserCredential) {
      setTimeout(() => {
        router.push("/se-connecter");
      }, 6000);
    }
  }, [newUserCredential, router]);

  console.log("email :", email);
  console.log("password :", password);

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Créer un compte</h1>

          <nav className="nav-directory">
            <a href="se-connecter">Se connecter</a>
          </nav>
          <p>
            Votre compte <span className="logo">pvssy talk</span> vous permet de
            faire des suggestions pour l’<a>agenda</a> et l’
            <a>annuaire</a>. D’autres fonctionnalités sont à venir.
          </p>
        </div>
        <div>
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
              <div className="form-section">
                <label htmlFor="passwordRepeat" className="required">
                  <span>Confirmer mot de passe</span>
                </label>
                <div className="input-section">
                  <input
                    type={isVisibleRepeat ? "text" : "password"}
                    placeholder="Mot de passe"
                    name="passwordRepeat"
                    onChange={handlePasswordRepeatChange}
                    required
                  />
                  <button className="showPassword" onClick={seePasswordRepeat}>
                    <FontAwesomeIcon
                      id="eye-icon"
                      icon={!isVisibleRepeat ? faEye : faEyeSlash}
                    />
                  </button>
                </div>
              </div>
              <div className="form-section checkbox-container">
                <input
                  onChange={handleGeneralConditions}
                  name="conditionsCheckbox"
                  type="checkbox"
                  required
                  className="form-check-input"
                />
                <label htmlFor="conditionsCheckbox">
                  <span> J’ai lu et j’accepte les </span>
                  <a href="/conditions-generales ">conditions générales</a>.
                </label>
              </div>
              <div
                //NOTE CREATE CLASS
                style={{
                  display: "flex",
                  gap: "1rem",
                  height: "fit-content",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={handleRegister}
                  disabled={
                    !(email &&
                    email.includes("@") &&
                    email.includes(".") &&
                    password === passwordRepeat &&
                    password.length >= 6 &&
                    isAccepted === true
                      ? true
                      : false)
                  }
                >
                  <span>Créer un compte</span>
                </button>
                <a href="se-connecter">Déjà un compte ?</a>
              </div>
              {newUserCredential && (
                <div>
                  <span className="msg success">
                    Un lien de vérification vous a été envoyé par email{" "}
                  </span>
                </div>
              )}
              {registrationError ===
                "Firebase: Error (auth/email-already-in-use)." && (
                <p className="msg warning">
                  Un compte existe déjà avec cet email
                </p>
              )}
            </form>
            <div
              style={{
                //NOTE CREATE CLASS
                display: "flex",
                gap: "1rem",
                height: "fit-content",
                alignItems: "center",
              }}
            >
              <span>ou</span>
              <GoogleButton
                style={{ fontSize: "14px" }}
                label="Connexion avec Google"
                onClick={handleGoogleSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
