import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = parseInt(event.target.value);
    setNumber(value);
    setCurrentNOE(value);
  };

  return (
    <div data-testid="number-of-events">
      <label htmlFor="number-of-events">Number of Events:</label>
      <input
        type="number"
        id="number-of-events"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;