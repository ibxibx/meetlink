import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/FilterEventsByCity.feature");

jest.mock("../api");

defineFeature(feature, (test) => {
  beforeEach(() => {
    getEvents.mockResolvedValue([
      { id: 1, summary: "Event 1", location: "Berlin, Germany" },
      { id: 2, summary: "Event 2", location: "London, UK" },
    ]);
  });

  test("Show upcoming events from all cities by default", ({
    given,
    when,
    then,
  }) => {
    given("the user has not searched for any city", () => {
      // No action needed
    });

    when("the user opens the app", () => {
      render(<App />);
    });

    then("the user should see a list of upcoming events", async () => {
      const eventList = await screen.findByTestId("event-list");
      const eventItems = within(eventList).getAllByRole("listitem");
      expect(eventItems.length).toBeGreaterThan(0);
    });
  });

  test("User can search for events in a specific city", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the main page", () => {
      render(<App />);
    });

    when("the user searches for a specific city", async () => {
      const user = userEvent.setup();
      const citySearch = screen.getByPlaceholderText("Search for a city");
      await user.type(citySearch, "Berlin");
    });

    then("the user should see a list of events in that city", async () => {
      const eventList = await screen.findByTestId("event-list");
      const eventItems = within(eventList).getAllByRole("listitem");
      expect(eventItems.length).toBeGreaterThan(0);

      const berlinEvents = eventItems.filter((item) =>
        item.textContent.includes("Berlin")
      );
      expect(berlinEvents.length).toBeGreaterThan(0);
    });
  });
});
