import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
          <Link to="/profile">Profile</Link>
          <button onClick={Logout}>Logout</button>
        </>
      );
    }
    return (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    );
  };

  return (
    <nav>
      <ul className="flex space-x-5 text-2xl bg-fuchsia-50">
        <Link to="/">Home</Link>
        <Link to="/trading">Trading</Link>
        <Link to="/search">Search</Link>
        {loadNavbarComponents()}
      </ul>
    </nav>
  );
};

export default Navbar;
