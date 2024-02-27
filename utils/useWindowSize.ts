import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [is600Max, setIs600Max] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIs600Max(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return is600Max;
};

export default useWindowSize;
