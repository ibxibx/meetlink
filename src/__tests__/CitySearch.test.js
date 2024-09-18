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

  test("clicking on a suggestion should update the query and hide suggestions", () => {
    const allLocations = ["Berlin, Germany", "Paris, France", "New York, USA"];
    const setCurrentCity = jest.fn();

    render(
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    );

    const input = screen.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });

    const berlinSuggestion = screen.getByText("Berlin, Germany");
    fireEvent.click(berlinSuggestion);

    expect(input.value).toBe("Berlin, Germany");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(setCurrentCity).toHaveBeenCalledWith("Berlin, Germany");
  });

  test("clicking 'See all cities' should update the query and hide suggestions", () => {
    const allLocations = ["Berlin, Germany", "Paris, France", "New York, USA"];
    const setCurrentCity = jest.fn();

    render(
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    );

    const input = screen.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });

    const seeAllCities = screen.getByText("See all cities");
    fireEvent.click(seeAllCities);

    expect(input.value).toBe("See all cities");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(setCurrentCity).toHaveBeenCalledWith("See all cities");
  });

  test("selects 'See all cities' when it is clicked", () => {
    const allLocations = ["Berlin, Germany", "Paris, France", "New York, USA"];
    const setCurrentCity = jest.fn();
    render(
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    );

    const input = screen.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });

    const seeAllCitiesItem = screen.getByText("See all cities");
    fireEvent.click(seeAllCitiesItem);

    expect(setCurrentCity).toHaveBeenCalledWith("See all cities");
    expect(input.value).toBe("See all cities");
  });

  test("selects a city from the suggestions", () => {
    const allLocations = ["Berlin, Germany", "Paris, France", "New York, USA"];
    const setCurrentCity = jest.fn();
    render(
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    );

    const input = screen.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });

    const berlinSuggestion = screen.getByText("Berlin, Germany");
    fireEvent.click(berlinSuggestion);

    expect(setCurrentCity).toHaveBeenCalledWith("Berlin, Germany");
    expect(input.value).toBe("Berlin, Germany");
  });

  test("shows suggestions when the input is focused", () => {
    const allLocations = ["Berlin, Germany", "Paris, France", "New York, USA"];
    const setCurrentCity = jest.fn();
    render(
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    );

    const input = screen.getByPlaceholderText("Search for a city");
    fireEvent.focus(input);

    const suggestionList = screen.getByRole("list", { name: "suggestions" });
    expect(suggestionList).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(allLocations.length + 1); // +1 for "See all cities"
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
