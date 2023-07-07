import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Se connecter</h1>
        </div>
        <div>
          <a href="creer-un-compte">Créer un compte</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
