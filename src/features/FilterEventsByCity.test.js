import { loadFeature, defineFeature } from "jest-cucumber";
import {
  render,
  within,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react";
import App from "../App";
import { getEvents } from "../mock-data";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When the user hasnt searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasnt searched for any city", () => {});

    when("the user opens the app", () => {
      render(<App />);
    });

    then("the user should see the list of all upcoming events", async () => {
      await waitFor(() => {
        const eventListItems = screen.getAllByRole("listitem");
        expect(eventListItems.length).toBeGreaterThan(0);
      });
    });
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    given("the main page is open", () => {
      render(<App />);
    });

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      const citySearchInput = screen.getByPlaceholderText("Search for a city");
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "the user should see a list of suggestions when they search for a city",
      async () => {
        await waitFor(() => {
          const suggestionList = screen.getByRole("list", {
            name: "suggestions",
          });
          expect(suggestionList).toBeInTheDocument();
        });

        const suggestionItems = screen.getAllByRole("listitem");
        expect(suggestionItems.length).toBeGreaterThan(0);
      }
    );
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    let citySearchInput;

    given("user was typing Berlin in the city textbox", async () => {
      render(<App />);
      const user = userEvent.setup();
      citySearchInput = screen.getByPlaceholderText("Search for a city");
      await user.type(citySearchInput, "Berlin");
    });

    and("the list of suggested cities is showing", async () => {
      await waitFor(() => {
        const suggestionList = screen.getByRole("list", {
          name: "suggestions",
        });
        expect(suggestionList).toBeInTheDocument();
      });

      const suggestions = screen.getAllByRole("listitem");
      expect(suggestions.length).toBeGreaterThan(0);
    });

    when(
      "the user selects a city (e.g., Berlin, Germany) from the list",
      async () => {
        const suggestionList = screen.getByRole("list", {
          name: "suggestions",
        });
        const suggestions = within(suggestionList).getAllByRole("listitem");

        const berlinSuggestion = suggestions.find((suggestion) =>
          suggestion.textContent.toLowerCase().includes("berlin")
        );

        if (berlinSuggestion) {
          fireEvent.click(berlinSuggestion);
        } else {
          throw new Error("Berlin suggestion not found");
        }
      }
    );

    then(
      "their city should be changed to that city (i.e., Berlin, Germany)",
      async () => {
        await waitFor(() => {
          expect(citySearchInput.value.toLowerCase()).toContain("berlin");
        });
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter((event) =>
          event.location.toLowerCase().includes("berlin")
        );

        await waitFor(() => {
          const eventListItems = screen.getAllByRole("listitem");
          expect(eventListItems.length).toBeGreaterThan(0);
        });

        const eventListItems = screen.getAllByRole("listitem");
        expect(eventListItems.length).toBeLessThanOrEqual(berlinEvents.length);
      }
    );
  });
});
