import React from 'react';
import '../Css/SearchBar.css';


function SearchBar({ searchTerm, setSearchTerm, reservations }) {
  return (
    <div className="search-bar">
    {reservations.length > 0 ? (
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by username..."
      />
    ): (
      <p></p>
    )}
    </div>
  );
}

export default SearchBar;
