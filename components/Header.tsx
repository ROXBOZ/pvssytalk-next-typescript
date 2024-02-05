import React, { useMemo, useState } from "react";

// import { Link } from "react-scroll";
import Link from "next/link";
import { MenuDetail } from "../types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Header = ({ data: initialData }: any) => {
  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === "/";
  const isDirectory = pathname === "/ressources/annuaire";
  const [isOpen, setIsOpen] = useState(false);

  const data = useMemo(() => {
    return [
      {
        isAction: false,
        title: "ressources",
        onClick: () => {
          setIsOpen(!isOpen);
        },
      },
      ...initialData,
    ];
  }, [initialData, isOpen]);

  const Modal = () => {
    return (
      <motion.div
        initial={{
          width: 0,
          height: 0,
        }}
        animate={{
          width: "45rem",
          height: "min-content",
        }}
        transition={{
          duration: 0.01,
        }}
        className="header-modal"
      >
        <div style={{ backgroundColor: "violet" }}>
          <span>Par où commencer</span>
          <ul>
            <li>Introduction aux douleurs</li>
            <li>Guide d'auto-observation</li>
            <li>Qui consulter ?</li>
          </ul>
        </div>
        <div style={{ backgroundColor: "yellow" }}>
          <span>S’informer sur ses douleurs</span>
          <ul>
            <li>Endométriose</li>
            <li>Syndrome des ovaires polykystiques</li>
            <li>Lich scléreux</li>
            <li>Sécheresse vaginale</li>
            <li>Utérus rétroversé</li>
            <li>Vaginisme</li>
            <li>Vaginite et mycose</li>
            <li>Vulvodynie</li>
          </ul>
        </div>
        <div style={{ backgroundColor: "orange" }}>
          <span>Se soigner</span>
          <ul>
            <li>Annuaire</li>
            <li>Exercices</li>
          </ul>
        </div>
        <div style={{ backgroundColor: "lightblue" }}>
          <span>Comprendre</span>
          <ul>
            <li>Glossaire</li>
            <li>Médias</li>
            <li>Agenda</li>
          </ul>
        </div>
        <div style={{ backgroundColor: "lightgreen" }}>
          <span>Participer</span>
          <ul>
            <li>Devenir membre</li>
            <li>Faire un don</li>
          </ul>
        </div>
        <div style={{ backgroundColor: "lightcoral" }}>
          <span>À propos</span>
          <ul>
            <li>À propos</li>
          </ul>
        </div>
      </motion.div>
    );
  };

  return (
    <header>
      <Link href="/" className="borderless">
        <span className="logo nowrap">
          pvssy talk <sup>1.0</sup>
        </span>
      </Link>
      <nav>
        {data &&
          data.map((item: MenuDetail, index: number) => {
            if (item._type === "page") {
              return (
                <Link key={index} href={`/${item.slug.current}`}>
                  {item.title}
                </Link>
              );
            }
            if (item._type === "customLink") {
              const isInternal =
                item.link.includes("pvssy") || item.link.includes("/#");

              if (item.isAction === false) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target={isInternal ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </Link>
                );
              }
              if (
                item.isAction === true &&
                isHome === false &&
                isDirectory === false
              ) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target={isInternal ? "_self" : "_blank"}
                  >
                    <button className="primary-button"> {item.title}</button>
                  </Link>
                );
              }
            }

            if (item.title === "ressources") {
              return (
                <div
                  className="modal-open-link"
                  key={index}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{item.title}</span>
                  {isOpen && <Modal />}
                </div>
              );
            }
            return null;
          })}
      </nav>
    </header>
  );
};

export default Header;
