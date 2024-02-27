import React, { useEffect, useState } from "react";

import Link from "next/link";
import { PainDashboardProps } from "../types";
import PartageNav from "./PartageNav";
import { motion } from "framer-motion";
import { websiteURL } from "../utils/urls";

const PainDashboard = ({ pain, isMed, setIsMed }: PainDashboardProps) => {
  const [currentURL, setCurrentURL] = useState("");
  const [is600Min, setIs600Min] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const constructedURL = websiteURL + currentPath;
    setCurrentURL(constructedURL);

    const handleResize = () => {
      setIs600Min(window.innerWidth >= 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSwitch = () => setIsMed(!isMed);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <nav className="pain-nav">
      <h3>Approche</h3>
      <div className="switch" data-ison={isMed} onClick={toggleSwitch}>
        <div className="types">
          <span>sexologique</span>
          <span>médicale</span>
        </div>
        <motion.div className="handle" layout transition={spring} />
      </div>

      {is600Min && (
        <>
          <div className="ressources-nav">
            <h3>Ressources</h3>
            <Link href={`${pain.slug.current}/annuaire`}>Annuaire</Link>
            <Link href={`${pain.slug.current}/exercices`}>Exercices</Link>
            <Link href={`${pain.slug.current}/glossaire`}>Glossaire</Link>
            <Link href={`${pain.slug.current}/medias`}>Médias</Link>
          </div>
          <PartageNav pain={pain.name} />
        </>
      )}
    </nav>
  );
};

export default PainDashboard;
