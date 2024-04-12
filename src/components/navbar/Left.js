import React from "react";

const Left = ({ shapes }) => {
  return (
    <div className="left">
      {shapes.map((shape, index) => (
        <h2 key={shape.id}>
          {index + 1} <span>-{">"}</span> {shape.type}
        </h2>
      ))}
    </div>
  );
};

export default Left;
