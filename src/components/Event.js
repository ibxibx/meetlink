import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <h2 className="event-title">{event.summary}</h2>
      <p className="event-start-time">{new Date(event.start.dateTime).toLocaleString()}</p>
      <p className="event-location">{event.location}</p>
      
      {showDetails && (
        <div className="event-details" data-testid="event-details">
          <h3>About the event:</h3>
          <p>{event.description}</p>
          <p>
            <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
              See details on Google Calendar
            </a>
          </p>
        </div>
      )}
      
      <button className="details-btn" onClick={toggleDetails}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
    </li>
  );
};

export default Event;