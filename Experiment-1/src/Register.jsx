import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    const formName = e.target.fullname.value.trim();
    const formEmail = e.target.email.value.trim();
    const formPassword = e.target.password.value;
    if (!formName || !formEmail || !formPassword) {
      setMessage("All fields are required.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === formEmail)) {
      setMessage("An account with this email already exists.");
      return;
    }
    users.push({ name: formName, email: formEmail, password: formPassword });
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Registered successfully! Redirecting to login...");
    setTimeout(() => navigate("/"), 1500);
  }

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create an Account</h2>
        <p className="register-subtitle">Join Tutly and start learning today.</p>

        {message && <p className="register-msg">{message}</p>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
