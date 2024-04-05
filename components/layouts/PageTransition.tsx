import React from "react";
import { motion } from "framer-motion";

function PageTransition({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        translateY: -200,
      }}
      transition={{ duration: 0.25 }}
    >
      <> {children}</>
    </motion.div>
  );
}

export default PageTransition;
