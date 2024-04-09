import React, { useEffect } from "react";

import Link from "next/link";
import Marquee2 from "./Marquee2";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

function DotsZone(data: any) {
  const text = data.data.text;
  const label = data.data.callToAction.label;
  const url = data.data.callToAction.link.slug.current;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        ".dot",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          stagger: {
            each: 0.2,
            from: "start",
          },
          ease: "elastic.inOut (1, 0.3)",
        }
      );
      gsap.fromTo(
        ".dot.primary",
        {
          backgroundColor: "#e09cff",
        },
        {
          backgroundColor: "#f02b00",
          duration: 3,
        }
      );
      gsap.utils.toArray(".dot.primary").forEach((dot: any, index) => {
        gsap.fromTo(
          dot,
          {
            boxShadow: "0 0 0px 0px white, 0 0 0px 0px white",
          },
          {
            boxShadow: "0 0 50px 30px #f02b00, 0 0 100px 60px #e09cff",
            duration: 4,
            repeat: -1,
            yoyo: true,
            delay: index * 2,
          }
        );
      });
    }
  }, [inView]);

  return (
    <>
      <div className="dots-zone snap-section" ref={ref}>
        <div className="content">
          <p className="h3">{text}</p>
          <Link href={`/${url}`} style={{ borderBottom: 0 }}>
            <button className="secondary-button">{label}</button>
          </Link>
        </div>
        <div className="dots-container">
          <div className="dot primary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot primary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot primary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot primary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot primary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
          <div className="dot secondary" />
        </div>
      </div>
      {/* <Marquee2 repeatTimes={999} /> */}
    </>
  );
}

export default DotsZone;
