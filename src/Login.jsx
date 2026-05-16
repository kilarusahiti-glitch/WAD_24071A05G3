import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const formEmail = e.target.email.value.trim();
    const formPassword = e.target.password.value;
    if (!formEmail || !formPassword) {
      setError("Please enter email and password.");
      return;
    }
    // check demo account
    if (formEmail === "student@tutly.com" && formPassword === "1234") {
      navigate("/dashboard");
      return;
    }
    // check registered users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const match = users.find((u) => u.email === formEmail && u.password === formPassword);
    if (match) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login to Tutly</h2>
        <p className="login-subtitle">Welcome back! Please login to continue.</p>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="student@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
