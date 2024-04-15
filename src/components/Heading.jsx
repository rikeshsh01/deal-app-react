import React from "react";
import { FaUser } from 'react-icons/fa';

const Header = () => {
    return (
      <header className="header">
        <div className="logo">Logo</div>
        <nav className="navigation">Navigation Menu</nav>
        <div className="search">Search</div>
        <div className="user-profile">User Profile <FaUser /> {/* Adding user icon */}</div>
      </header>
    );
  };
  
  export default Header;
