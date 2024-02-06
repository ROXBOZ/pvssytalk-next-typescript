import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Marquee2 = ({ repeatTimes }: any) => {
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

  const contentArray = Array.from({ length: repeatTimes }, (_, index) => (
    <Content key={index} />
  ));

  return (
    <div className="marquee2">
      <motion.div className="marquee-content">{contentArray}</motion.div>
    </div>
  );
};

export default Marquee2;
