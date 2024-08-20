import React, { useState } from 'react';
import stockSymbols from './companies';

const SearchBar = ({ fetchFromApi }) => {
  const [query, setQuery] = useState('');
  const [filteredSymbols, setFilteredSymbols] = useState([]);

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    setQuery(value);
    filterSymbols(value);
  };

  // Filter symbols based on the query
  const filterSymbols = (searchQuery) => {
    if (searchQuery.length === 0) {
      setFilteredSymbols([]);
      return;
    }

    const results = stockSymbols.filter(symbol => 
      symbol.startsWith(searchQuery)
    );
    setFilteredSymbols(results);
  };

  // Handle the search result click
  const handleResultClick = (symbol) => {
    // Update the input field with the selected symbol
    setQuery(symbol);

    // Clear the filtered symbols list
    setFilteredSymbols([]);

    // Call the API with the selected symbol
    fetchFromApi(symbol);
  };

  return (
    <div>
      <input 
        id="search"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search stock symbols..."
      />
      <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        {filteredSymbols.slice(0, 10).map((symbol, index) => (
          <li 
            key={index}
            onClick={() => handleResultClick(symbol)}
            style={{ cursor: 'pointer' }}
          >
            {symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
