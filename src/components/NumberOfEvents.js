import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, currentNOE }) => {
  const [number, setNumber] = useState(currentNOE || 32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
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
        min="1"
      />
    </div>
  );
};

export default NumberOfEvents;
