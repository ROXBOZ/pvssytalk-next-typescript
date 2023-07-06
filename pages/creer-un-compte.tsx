import React, { useState } from "react";

type Props = {};

const Signup = (props: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    console.log("email :", email);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
    console.log("name :", name);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    console.log("password :", password);
  };

  const handleSignup = () => {
    console.log("send :");
  };

  return (
    <main>
      <h1>Créer un compte</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">
          <span>Adresse Email</span>
        </label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleEmailChange}
          required
        />
        <label htmlFor="email">
          <span>Nom et prénom</span>
        </label>
        <input
          type="text"
          placeholder="Nom"
          name="nom"
          onChange={handleNameChange}
          required
        />
        <label htmlFor="password">
          <span>Mot de passe</span>
        </label>
        <input
          type="text"
          placeholder="Mot de passe"
          name="password"
          onChange={handlePasswordChange}
          required
        />
        <label htmlFor="password"></label>
        <button onClick={handleSignup}>Créer un compte</button>
      </form>
    </main>
  );
};

export default Signup;
