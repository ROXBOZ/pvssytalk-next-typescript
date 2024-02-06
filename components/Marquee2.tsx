import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Marquee2 = () => {
  const Content = () => {
    return (
      <div className="text">
        <span>Let’s</span>
        <Link href="mailto:hello@pvssy-talk.org" className="logo">
          pvssy talk
        </Link>
        <span> !</span>
      </div>
    );
  };

  return (
    <div className="marquee2">
      <motion.div className="marquee-content">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </motion.div>
    </div>
  );
};

export default Marquee2;
