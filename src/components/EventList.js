import React from 'react';
import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul data-testid="event-list">
      {events.map(event => <Event key={event.id} event={event} />)}
    </ul>
  );
}

export default EventList;