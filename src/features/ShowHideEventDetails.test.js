import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/ShowHideEventDetails.feature");

jest.mock("../api");

defineFeature(feature, (test) => {
  beforeEach(() => {
    getEvents.mockResolvedValue([
      {
        id: 1,
        summary: "Test Event 1",
        location: "Test Location 1",
        description: "Test Description 1",
        start: { dateTime: "2023-06-01T19:00:00+02:00" },
      },
      {
        id: 2,
        summary: "Test Event 2",
        location: "Test Location 2",
        description: "Test Description 2",
        start: { dateTime: "2023-06-02T19:00:00+02:00" },
      },
    ]);
  });

  test("An event element is collapsed by default", ({ given, then }) => {
    given("the user is viewing the event list", async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
      });
    });

    then("the event details should be hidden", () => {
      const eventElements = screen.getAllByRole("listitem");
      eventElements.forEach((eventElement) => {
        expect(
          within(eventElement).queryByText("Test Description")
        ).not.toBeInTheDocument();
      });
    });
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    given("the user is viewing the event list", async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
      });
    });

    when(
      "the user clicks on the show details button for an event",
      async () => {
        const user = userEvent.setup();
        const showDetailsButtons = screen.getAllByText("show details");
        await user.click(showDetailsButtons[0]);
      }
    );

    then("the event details should be visible for that event", () => {
      expect(screen.getByText("Test Description 1")).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    given("the user is viewing an expanded event", async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
      });
      const user = userEvent.setup();
      const showDetailsButtons = screen.getAllByText("show details");
      await user.click(showDetailsButtons[0]);
    });

    when(
      "the user clicks on the hide details button for the event",
      async () => {
        const user = userEvent.setup();
        const hideDetailsButton = screen.getByText("hide details");
        await user.click(hideDetailsButton);
      }
    );

    then("the event details should be hidden for that event", () => {
      expect(screen.queryByText("Test Description 1")).not.toBeInTheDocument();
    });
  });
});
