import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (allLocations) {
      setSuggestions(allLocations);
    }
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations 
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);
    setShowSuggestions(true);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onChange={handleInputChanged}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions" aria-label="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={handleItemClicked}>
              {suggestion}
            </li>
          ))}
          <li key="see-all-cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;