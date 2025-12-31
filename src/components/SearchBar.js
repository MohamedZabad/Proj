import React from "react";

function SearchBar({ query, setQuery }){
    return (
        <input 
            type="text"
            placeholder="Search for a game..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
        />
    );
}

export default SearchBar;