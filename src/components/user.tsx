import React, { useState, useEffect } from 'react';

function CitySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }
    const fetchResults = async () => {
      const response = await fetch(`https://api.teleport.org/api/cities/?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      const results = data._embedded["city:search-results"].map(result => ({
        name: result.name,
        country: result.matching_full_name
      }));
      setSearchResults(results);
    };
    const timeoutId = setTimeout(fetchResults, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  const handleResultClick = (result) => {
    setSearchTerm(`${result.name}, ${result.country}`);
    setSearchResults([]);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search for a city or country..." />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index} onClick={() => handleResultClick(result)}>{result.name}, {result.country}</li>
        ))}
      </ul>
    </div>
  );
}

export default CitySearch;
