import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";


const Header = () => {
    let navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (
        <header className="header">
            {/* <Logo />
            <Navigation />
            <Search />
            <UserProfile /> */}
            <div className="container">
                <nav className="main-nav">
                    <Link to="/" className="logo">
                        <img src="https://img.logoipsum.com/332.svg" alt="" />
                    </Link>
                    <ul className="nav">
                        <li className="scroll-to-section"><Link to="/" className="">Home</Link></li>
                        <li className="scroll-to-section"><Link to="/about" className="">About</Link></li>
                        <li className="scroll-to-section"><Link to="/marketplace" className="">Marketplace</Link></li>
                        <li className="scroll-to-section"><Link to="/contact" className="">Contact</Link></li>
                    </ul>
                    {/* <div className="nav-extras">
                        <form className="search-form">
                            <input type="text" placeholder="Search" className="search-input" />
                            <button type="submit" className="search-button"><CiSearch size={20} /></button>
                        </form>

                    </div> */}
                    <div className="user-profile">
                        <FaUserCircle size={40} />
                        <ul className="profile-list">
                            <li className="profile-list-li">
                                <button>My Profile</button>
                            </li>
                            <li className="profile-list-li">
                                <button onClick={handleClick}>Log Out</button>
                            </li>
                        </ul>
                    </div>



                </nav>
            </div>

        </header>
    );
};

export default Header;
