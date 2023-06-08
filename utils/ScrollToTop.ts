import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const excludedPaths = [
      "/profile/ajouter",
      "/profile/modifier",
      "/profile/approuver",
      "/profile/supprimer",
      "/#start",
      /\/douleurs\/.+\/medical/,
      /\/douleurs\/.+\/sexologie/,
    ];

    for (const path of excludedPaths) {
      if (typeof path === "string" && pathname === path) {
        return;
      } else if (path instanceof RegExp && path.test(pathname)) {
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
