import React, { useEffect } from "react";

import { Diagram } from "../types";
import Image from "next/image";
import { urlFor } from "../config/sanity/client";

interface ModalProps {
  diagram: Diagram;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ diagram, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content">
        <button onClick={closeModal}>fermer</button>

        <Image
          className="schema"
          src={urlFor(diagram.diagram.asset._ref).url()}
          width={600}
          height={600}
          alt={`schéma : ${diagram.diagram.alternativeText}`}
        />
        <p className="schema-caption">{diagram.diagram.caption}</p>
      </div>
    </div>
  );
};

export default Modal;
