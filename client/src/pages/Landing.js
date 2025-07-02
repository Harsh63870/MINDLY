import React from "react";
import Questionnaire from "../components/Questionnaire";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <h1>Welcome to Mindly</h1>
      <div className="questionnaire">
        <Questionnaire />
      </div>
      <div>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Landing;