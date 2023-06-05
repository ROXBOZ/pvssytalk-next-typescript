import Link from "next/link";
import React from "react";

type Props = {};

const Start = (props: Props) => {
  return (
    <div className="double-column-container">
      <div>
        <h2>Par où commencer</h2>
      </div>
      <div>
        <nav className="nav-directory">
          <Link href="start/introduction">Introduction aux douleurs</Link>
          <Link href="start/guide">Guide d’auto-observation</Link>
          <Link href="start/consultation">Qui consulter ?</Link>
        </nav>
      </div>
    </div>
  );
};

export default Start;
