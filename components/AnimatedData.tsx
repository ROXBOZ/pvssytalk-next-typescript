import React from "react";

function AnimatedData() {
  const Dot = ({ color }: any) => <div className={`${color}Dot`} />;

  const generateDots = (pattern: any) =>
    pattern.map(({ color, count }: any, index: number) =>
      Array.from({ length: count }, (_, dotIndex) => (
        <React.Fragment key={`${index}-${dotIndex}`}>
          <Dot color={color} />
        </React.Fragment>
      ))
    );

  const dotsPattern = [
    { color: "violet", count: 3 },
    { color: "orange", count: 1 },
    { color: "violet", count: 2 },
    { color: "orange", count: 1 },
    { color: "violet", count: 3 },
  ];

  const generatedDots = generateDots(dotsPattern);

  return <div className="animated-data">{generatedDots}</div>;
}

export default AnimatedData;
