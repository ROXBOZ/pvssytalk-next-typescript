import React, { ReactNode } from "react";

import Link from "next/link";
import { PainDetail } from "../../types";
import PainNav from "../painNav";

const PainResourcePageLayout: React.FC<{
  pageName: string;
  pain: PainDetail;
  relatedContent: any;
  children?: ReactNode;
}> = ({ pageName, pain, relatedContent, children }) => {
  return (
    <>
      <div>
        <div className="double-column-containers-group">
          <div className="double-column-container">
            <div className="fixed-container">
              <h1>
                {pageName}{" "}
                <Link href="./" className="colored logo">
                  {pain.name}
                </Link>{" "}
                <sup className="no-color">
                  {
                    relatedContent.filter(
                      (item: any) => item.isValidated === true
                    ).length
                  }
                </sup>
              </h1>
              <PainNav pain={pain} />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PainResourcePageLayout;
