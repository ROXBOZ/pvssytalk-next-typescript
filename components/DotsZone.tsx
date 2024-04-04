import Link from "next/link";
import React from "react";

function DotsZone(data: any) {
  const text = data.data[0].text;
  const label = data.data[0].callToAction.label;
  const url = data.data[0].callToAction.link.slug.current;
  return (
    <div className="dots-zone snap-section">
      <div className="content">
        <p className="h3">{text}</p>
        <Link href={`/${url}`} style={{ borderBottom: 0 }}>
          <button className="secondary-button">{label}</button>
        </Link>
      </div>
      <div className="dots-container">
        <div className="primary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="primary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="primary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="primary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="primary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
        <div className="secondary dot" />
      </div>
    </div>
  );
}

export default DotsZone;
