import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/marketplace">Marketplace</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  );
};

export default Navigation;
