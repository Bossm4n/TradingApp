import React, { useState } from 'react';
import stockSymbols from './companies';

const SearchBar = () => {
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
    setFilteredSymbols(results.slice(0, 10)); // Limit to first 10 results
  };

  return (
    <div>
      <input 
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search stock symbols..."
      />
      <ul style={{ maxHeight: '200px', overflowY: 'auto', padding: 0, margin: 0, listStyleType: 'none' }}>
        {filteredSymbols.map((symbol, index) => (
          <li key={index} style={{ padding: '5px 0' }}>{symbol}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
