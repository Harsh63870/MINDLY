import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <Link to="/register" className="auth-link">
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;