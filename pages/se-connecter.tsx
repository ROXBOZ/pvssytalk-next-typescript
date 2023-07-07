import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Se connecter</h1>
          <nav className="nav-directory">
            <a href="creer-un-compte">Créer un compte</a>
          </nav>

          <p style={{ color: "red" }}>
            only be able to connect if email verified
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
