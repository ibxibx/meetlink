import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    setCurrentNOE(parseInt(value) || 32); // Use 32 as default if parsing fails
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