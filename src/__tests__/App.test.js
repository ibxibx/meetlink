import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { getEvents, extractLocations } from "../api";
import App from "../App";
import { act } from "react-dom/test-utils";

jest.setTimeout(50000);

// Mock the API
jest.mock("../api");

const mockEvents = [
  {
    id: 1,
    kind: "calendar#event",
    summary: "Event 1",
    location: "Berlin, Germany",
    start: {
      dateTime: "2023-06-15T19:00:00+02:00",
      timeZone: "Europe/Berlin",
    },
  },
  {
    id: 2,
    kind: "calendar#event",
    summary: "Event 2",
    location: "Berlin, Germany",
    start: {
      dateTime: "2023-06-16T19:00:00+02:00",
      timeZone: "Europe/Berlin",
    },
  },
  {
    id: 3,
    kind: "calendar#event",
    summary: "Event 3",
    location: "London, UK",
    start: {
      dateTime: "2023-06-17T19:00:00+01:00",
      timeZone: "Europe/London",
    },
  },
];

describe("<App /> component", () => {
  beforeEach(() => {
    getEvents.mockResolvedValue(mockEvents);
  });

  test("renders CitySearch", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders EventList", () => {
    render(<App />);
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });

  test("renders NumberOfEvents", () => {
    render(<App />);
    expect(screen.getByTestId("number-of-events")).toBeInTheDocument();
  });
});

describe("<App /> integration", () => {
  beforeEach(() => {
    getEvents.mockResolvedValue(mockEvents);
    extractLocations.mockReturnValue(["Berlin, Germany", "London, UK"]);
  });

  test("renders a list of events matching the city selected by the user", async () => {
    render(<App />);
    // Wait for the events to load
    await waitFor(() => {
      const eventList = screen.getByTestId("event-list");
      expect(eventList.children).toHaveLength(mockEvents.length);
    });

    const cityInput = screen.getByRole("textbox");
    fireEvent.change(cityInput, { target: { value: "Berlin" } });

    // Wait for suggestions to appear
    await waitFor(() => {
      const suggestionList = screen.getByRole("list", { name: /suggestions/i });
      expect(suggestionList).toBeInTheDocument();
    });

    const suggestionList = screen.getByRole("list", { name: /suggestions/i });
    const berlinSuggestion =
      within(suggestionList).getByText("Berlin, Germany");
    expect(berlinSuggestion).toBeInTheDocument();

    fireEvent.click(berlinSuggestion);

    // Wait for the filtered list to update
    await waitFor(() => {
      const eventList = screen.getByTestId("event-list");
      expect(eventList.children).toHaveLength(2);
      expect(eventList.children[0]).toHaveTextContent("Event 1");
      expect(eventList.children[1]).toHaveTextContent("Event 2");
    });
  });

  test("number of events rendered matches the number inputted by user", async () => {
    const manyEvents = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      kind: "calendar#event",
      summary: `Event ${i + 1}`,
      location: "Some location",
      start: { dateTime: "2023-06-15T19:00:00+02:00" },
    }));
    getEvents.mockResolvedValue(manyEvents);

    render(<App />);

    // Wait for the events to load (default 32)
    await waitFor(() => {
      const eventList = screen.getByTestId("event-list");
      expect(eventList.children).toHaveLength(32);
    });

    const numberInput = screen.getByRole("spinbutton");
    fireEvent.change(numberInput, { target: { value: "10" } });

    // Wait for the list to update
    await waitFor(() => {
      const eventList = screen.getByTestId("event-list");
      expect(eventList.children).toHaveLength(10);
    });
  });
});
