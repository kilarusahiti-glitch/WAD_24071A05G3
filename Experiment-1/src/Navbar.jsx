import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  function handleLogout() {
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/courses">Tutly</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/contact">Contact</Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
