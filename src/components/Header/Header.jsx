import React from "react";
import Search from "./Search";
import AddButton from "./AddButton";

const Header = () => {
    
    return (
        <header className="header">
            <Search/>
            <AddButton/>
            
        </header>
    );
};

export default Header;
