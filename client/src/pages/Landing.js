import React from "react";
import Questionnaire from "../components/Questionnaire";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
function Stars() {
  const stars = Array.from({ length: 100 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDuration: `${Math.random() * 2 + 1}s`,
    };
    return <div className="star" style={style} key={i} />;
  });
  return <div className="stars">{stars}</div>;
}

function Landing() {
  return (
    <>
      <Stars />
      <div className="landing-container">
        <h1>Welcome to Mindly</h1>
        <div className="questionnaire">
          <Questionnaire />
        </div>
        <div>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}

export default Landing;