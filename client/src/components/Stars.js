import React from "react";
import "./Stars.css"; 

function Stars() {
  const stars = Array.from({ length: 80 }).map((_, i) =>{
    const size = Math.random() * 2 + 1;
    const glow = Math.random() > 0.7 ? "star-glow" : "";
    return (
      <div
        className={`star ${glow}`}
        style={{
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 2 + 1}s`,
        }}
        key={i}
      />
    );
  });
  return <div className="stars">{stars}</div>;
}

export default Stars;
