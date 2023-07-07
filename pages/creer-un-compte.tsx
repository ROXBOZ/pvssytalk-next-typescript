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
  const [userName, setUserName] = useState("");
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

  console.log("registrationError :", registrationError);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
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
    setUserName("");
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

  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Créer un compte</h1>
          <nav className="nav-directory">
            <a href="se-connecter">Se connecter</a>
            <a href="conditions-generales">Conditions générales</a>
          </nav>
        </div>
        <div>
          <div>
            <form>
              <div className="form-section">
                <label htmlFor="email" className="required">
                  <span>Adresse Email</span>
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
                  userName &&
                  (!email.includes("@") || !email.includes(".")) ? (
                    <span className="smaller-text colored">invalide email</span>
                  ) : null}
                </div>
              </div>
              <div className="form-section">
                <label htmlFor="userName" className="required">
                  <span>Pseudo</span>
                </label>
                <div className="input-section">
                  <input
                    type="text"
                    placeholder="Pseudo"
                    name="userName"
                    onChange={handleUserNameChange}
                    required
                  />
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
                    !(userName &&
                    email &&
                    email.includes("@") &&
                    email.includes(".") &&
                    password === passwordRepeat &&
                    password.length >= 6 &&
                    isAccepted === true
                      ? true
                      : false)
                  }
                >
                  Créer un compte
                </button>
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
              </div>
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
