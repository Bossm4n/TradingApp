// Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css_files/navbar.css"

const Navbar: React.FC = () => {
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.setItem("active", JSON.stringify(false));
    sessionStorage.setItem("user", JSON.stringify(null));
    navigate("/");
  };

  const loadNavbarComponents = () => {
    if (loggedIn) {
      return (
        <>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <button onClick={Logout} className="nav-button">
            Logout
          </button>
        </>
      );
    }
    return (
      <>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
      </>
    );
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {loadNavbarComponents()}
      </ul>
    </nav>
  );
};

export default Navbar;
