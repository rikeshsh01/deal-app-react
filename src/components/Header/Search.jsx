import React, { useState } from "react";
import { FaFilter } from 'react-icons/fa';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the search logic or pass the query to a search function
        console.log("Searching for:", searchQuery);
    };
    return (
        <>
            <div className="search">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="filter-icon">
                    <button>
                        <FaFilter />
                    </button>

                </div>
            </div>

        </>


    );
}

export default Search;