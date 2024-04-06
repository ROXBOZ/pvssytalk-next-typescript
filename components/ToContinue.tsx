import React, { useCallback } from "react";

import Link from "next/link";
import { PainDetail } from "../types";

export const ToContinue = ({
  isMed,
  setIsMed,
  filters,
  otherPains,
}: {
  isMed: boolean;
  setIsMed: React.Dispatch<React.SetStateAction<boolean>>;
  filters: any;
  otherPains: PainDetail;
}) => {
  const similarPains = otherPains.filter((pain: PainDetail) => {
    return pain.filters.some((painFilter) => filters.includes(painFilter));
  });

  const handleClick = useCallback(() => {
    setIsMed((prev) => !prev);
    const targetId = isMed ? "startMed" : "startSex";
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMed, setIsMed]);

  const similarPainsArray = similarPains as PainDetail[];

  return (
    <div className="to-continue">
      <div className="switch-approach">
        <span>
          C’était l'approche {isMed === true ? "médicale" : "sexologique"}.
        </span>
        <button className="logo" onClick={handleClick}>
          approche {isMed === true ? "sexologique" : "médicale"}
        </button>
      </div>
      <div className="similar-pains">
        {Array.isArray(similarPainsArray) && similarPainsArray.length > 0 && (
          <span>Douleurs similaires</span>
        )}
        {Array.isArray(similarPainsArray) &&
          similarPainsArray.map((pain: PainDetail, index: number) => (
            <Link href={pain?.slug?.current} key={index}>
              {pain?.name}
            </Link>
          ))}
      </div>
    </div>
  );
};
