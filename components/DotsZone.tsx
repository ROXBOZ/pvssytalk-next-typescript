import Link from "next/link";
import React from "react";

function DotsZone(data: any) {
  const text = data.data[0].text;
  const label = data.data[0].callToAction.label;

  return (
    <div className="dots-zone">
      <div className="content">
        <p className="h2">{text}</p>
        <Link href="" style={{ borderBottom: 0 }}>
          <button>{label}</button>
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
