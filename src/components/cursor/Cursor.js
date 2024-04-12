import React from "react";

const Cursor = ({ color, x, y, message }) => {
  console.log(x, y);
  return (
    /* <div className='pointer-events-none absolute top-0 left-0' style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
          
          
      
      </div> */
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m13.67 6.03-11-4a.5.5 0 0 0-.64.64l4 11a.5.5 0 0 0 .935.015l1.92-4.8 4.8-1.92a.5.5 0 0 0 0-.935h-.015Z"
        fill="gold"
      />
    </svg>
  );
};

export default Cursor;
