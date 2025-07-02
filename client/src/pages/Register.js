import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form">
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <Link to="/login" className="auth-link">
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;