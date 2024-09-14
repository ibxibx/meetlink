import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import { extractLocations } from "../api";
import App from "../App";

const mockEvents = [
  {
    id: 1,
    summary: "Event 1",
    location: "Berlin, Germany",
    start: { dateTime: "2023-06-01T00:00:00Z" },
  },
  {
    id: 2,
    summary: "Event 2",
    location: "Paris, France",
    start: { dateTime: "2023-06-02T00:00:00Z" },
  },
  {
    id: 3,
    summary: "Event 3",
    location: "New York, USA",
    start: { dateTime: "2023-06-03T00:00:00Z" },
  },
];

jest.mock("../api", () => ({
  getEvents: jest.fn(() => Promise.resolve(mockEvents)),
  extractLocations: jest.fn(() => mockEvents.map((event) => event.location)),
}));

describe("<CitySearch /> component", () => {
  test("renders the suggestion text in the textbox upon typing in the input", async () => {
    render(
      <CitySearch
        allLocations={extractLocations(mockEvents)}
        setCurrentCity={() => {}}
      />
    );

    const cityTextBox = screen.getByPlaceholderText("Search for a city");

    fireEvent.change(cityTextBox, { target: { value: "Berlin" } });

    await waitFor(() => {
      const suggestions = screen.getAllByRole("option");
      expect(suggestions.length).toBeGreaterThan(0);
    });
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered.", async () => {
    render(<App />);

    const cityTextBox = screen.getByPlaceholderText("Search for a city");

    fireEvent.change(cityTextBox, { target: { value: "Berlin" } });

    await waitFor(() => {
      const suggestions = screen.getAllByRole("option");
      expect(suggestions.length).toBeGreaterThan(0);
    });
  });
});
