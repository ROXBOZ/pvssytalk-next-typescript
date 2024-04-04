import React, { useEffect } from "react";

import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInView } from "react-intersection-observer";

function DotsZone(data: any) {
  const text = data.data.text;
  const label = data.data.callToAction.label;
  const url = data.data.callToAction.link.slug.current;

  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger animation when 50% of the component is in view
    triggerOnce: true, // Trigger animation only once
  });

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        ".dot",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,

          stagger: {
            each: 0.1,
            from: "edges",
          },
          ease: "power2.inOut",
        }
      );
    }
  }, [inView]);

  return (
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
  );
}

export default DotsZone;
