import React from "react";
import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from '../api';

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    const { getByRole } = render(<EventList events={[]} />);
    const listElement = getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    const { getAllByRole } = render(<EventList events={allEvents} />);
    const listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(allEvents.length);
  });
});