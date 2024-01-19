import React from "react";

function About({ about }: any) {
  console.log("about", about);
  return (
    <div
      //   className="double-column-container"
      style={{ backgroundColor: "fuchsia" }}
    >
      <div className="about-block">
        <h2>{about.title}</h2>
        text
      </div>
      <div>image</div>
    </div>
  );
}

export default About;
