import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/trading">Trading</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
