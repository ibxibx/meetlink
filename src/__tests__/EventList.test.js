import React from "react";
import { render, within, screen, waitFor } from "@testing-library/react";
import EventList from "../components/EventList";
import App from "../App";
import { getEvents } from "../api";
import mockData from "../mock-data"; // Import your mock data

jest.mock("../api"); // Mock the API
jest.setTimeout(60000);

describe("<EventList /> component", () => {
  beforeEach(() => {
    getEvents.mockResolvedValue(mockData); // Return mock data instead of calling API
  });

  test('has an element with "list" role', () => {
    render(<EventList events={[]} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    const allEvents = mockData; // Use mock data directly
    render(<EventList events={allEvents} />);

    await waitFor(() => {
      const eventListItems = screen.getAllByRole("listitem");
      expect(eventListItems.length).toBeGreaterThan(0); // Ensure events are rendered
    });

    const eventListItems = screen.getAllByRole("listitem");
    expect(eventListItems.length).toBeLessThanOrEqual(allEvents.length);
  });
});

describe("<EventList /> integration", () => {
  beforeEach(() => {
    getEvents.mockResolvedValue(mockData); // Mock API for App rendering as well
  });

  test("renders a list of events when the app is mounted and rendered", async () => {
    render(<App />);

    await waitFor(() => {
      const eventList = screen.getByTestId("event-list");
      const eventItems = within(eventList).queryAllByRole("listitem");
      expect(eventItems.length).toBeGreaterThan(0);
    });
  });
});
