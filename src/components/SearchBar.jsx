import React from 'react';
import sunIcon from "../assets/sun.svg";
import moonIcon from "../assets/moon.svg";
import searchIconLight from "../assets/search-light.svg";
import searchIconDark from "../assets/search-dark.svg";

const SearchBar = ({ search, setSearch, darkMode, toggleDarkMode, filter, setFilter }) => (
  <div className="search-bar-container">
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search note..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={darkMode ? "dark-input" : "light-input"}
      />
      <img src={darkMode ? searchIconDark : searchIconLight} alt="Search" className="search-icon" />
    </div>
    <select
      className="filter-dropdown"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="incomplete">Incomplete</option>
    </select>
    <button className="theme-switch" onClick={toggleDarkMode}>
      <img src={darkMode ? sunIcon : moonIcon} alt="Toggle Dark Mode" />
    </button>
  </div>
);

export default SearchBar;