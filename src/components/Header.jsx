import React from "react";
import { FaUser } from 'react-icons/fa';
import Search from "./Search";
import Navigation from "./Navigation";

const Header = () => {
    
    return (
        <header className="header">
            <div className="logo">
                <img src="https://img.logoipsum.com/332.svg" alt="Website Logo" />
            </div>
            <Search/>
            <Navigation />
            <div className="user-profile">
                User Profile <FaUser /> {/* Adding user icon */}
            </div>
        </header>
    );
};

export default Header;
