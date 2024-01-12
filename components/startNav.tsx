import React, { useEffect, useState } from "react";

import Link from "next/link";

type Props = {};

const StartNav = (props: Props) => {
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <nav className="nav-directory">
      {!currentURL.endsWith("introduction") && (
        <Link href="introduction">
          <span>Introduction aux douleurs</span>
        </Link>
      )}
      {!currentURL.endsWith("guide") && (
        <Link href="guide">
          <span>Guide d’auto-observation</span>
        </Link>
      )}
      {!currentURL.endsWith("consultation") && (
        <Link href="consultation">
          <span>Qui consulter ?</span>
        </Link>
      )}
    </nav>
  );
};

export default StartNav;
