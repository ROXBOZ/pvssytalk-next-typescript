import React, { useEffect, useState } from "react";

type Props = {};

const StartNav = (props: Props) => {
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <nav className="nav-directory">
      {!currentURL.endsWith("introduction") && (
        <a href="introduction">
          <span>Introduction aux douleurs</span>
        </a>
      )}
      {!currentURL.endsWith("guide") && (
        <a href="guide">
          <span>Guide d’auto-observation</span>
        </a>
      )}
      {!currentURL.endsWith("consultation") && (
        <a href="consultation">
          <span>Qui consulter ?</span>
        </a>
      )}
    </nav>
  );
};

export default StartNav;
