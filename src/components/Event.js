import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

const getEventDate = () => {
    if (event.start && event.start.dateTime) {
      return new Date(event.start.dateTime).toLocaleString();
    }
    return 'Date not available';
  };

  return (
    <li className="event">
      <h2 className="event-title">{event.summary}</h2>
      <p className="event-start-time">{getEventDate()}</p>
      <p className="event-location">{event.location}</p>
      
      {showDetails && (
        <div className="event-details" data-testid="event-details">
          <h3>About the event:</h3>
          <p>{event.description}</p>
          {event.htmlLink && (
            <p>
              <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
                See details on Google Calendar
              </a>
            </p>
          )}
        </div>
      )}
      
      <button className="details-btn" onClick={toggleDetails}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
    </li>
  );
};

export default Event;