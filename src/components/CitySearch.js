import React, { useState } from 'react';

const CitySearch = ({ allLocations }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase())
    );
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
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
      {showSuggestions && (
        <ul className="suggestions">
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