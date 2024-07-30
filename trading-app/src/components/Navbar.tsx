import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="flex space-x-5 text-2xl bg-fuchsia-50">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/trading">Trading</Link>
        <Link to="/search">Search</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
