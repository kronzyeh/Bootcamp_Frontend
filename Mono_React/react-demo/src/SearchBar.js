import React from 'react';
import './SearchBar.css';


function SearchBar({ searchTerm, setSearchTerm}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by username..."
      />
    </div>
  );
}

export default SearchBar;
