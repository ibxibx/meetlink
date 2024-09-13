import React from "react";
import { render, within, screen, waitFor } from "@testing-library/react";
import EventList from "../components/EventList";
import App from "../App";
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

describe('<EventList /> integration', () => {
  test('renders a list of events when the app is mounted and rendered', async () => {
    render(<App />);
    await waitFor(() => {
      const eventList = screen.getByTestId("event-list");
      const eventItems = within(eventList).queryAllByRole('listitem');
      expect(eventItems.length).toBeGreaterThan(0);
    });
  });
});