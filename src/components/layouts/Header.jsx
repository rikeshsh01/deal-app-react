import React from "react";
import Search from "../common/Search";
import Logo from '../common/Logo';
import Navigation from '../common/Navigation';
import UserProfile from '../common/UserProfile';
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {

    return (
        <header className="header">
            {/* <Logo />
            <Navigation />
            <Search />
            <UserProfile /> */}
              <div class="container">
                <nav class="main-nav">
                    <Link to="/" class="logo">
                        <img src="https://img.logoipsum.com/332.svg" alt="" />
                    </Link>
                    <ul class="nav">
                        <li class="scroll-to-section"><Link to="/" class="">Home</Link></li>
                        <li class="scroll-to-section"><Link to="/about" class="">About</Link></li>
                        <li class="scroll-to-section"><Link to="/marketplace" class="">Marketplace</Link></li>
                        <li class="scroll-to-section"><Link to="/contact" class="">Contact</Link></li>
                    </ul>
                    <div class="nav-extras">
                        <form class="search-form">
                            <input type="text" placeholder="Search" class="search-input" />
                            <button type="submit" class="search-button"><CiSearch size={20} /></button>
                        </form>

                    </div>
                    <div class="user-profile">

                        <FaUserCircle size={40} />
                    </div>
                </nav>
            </div>

        </header>
    );
};

export default Header;
