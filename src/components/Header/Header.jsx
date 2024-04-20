import React from "react";
import Search from "./Search";
import Logo from '../Header/Logo';
import Navigation from '../Header/Navigation';
import UserProfile from '../Header/UserProfile';

const Header = () => {

    return (
        <header className="header">
            <Logo />
            <Navigation />
            <Search />
            <UserProfile />

        </header>
    );
};

export default Header;
