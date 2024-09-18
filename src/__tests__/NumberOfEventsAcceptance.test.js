import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/NumberOfEvents.feature");

jest.mock("../api");

defineFeature(feature, (test) => {
  beforeEach(() => {
    getEvents.mockClear();
  });

  test("Change number of events displayed", ({ given, when, then }) => {
    given("the user is on the events page", async () => {
      getEvents.mockResolvedValue(new Array(32).fill({}));
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId("event-list")).toBeInTheDocument();
      });
    });

    when(
      "the user selects a different number from the Number of Events dropdown",
      async () => {
        const numberInput = await screen.findByRole("spinbutton");
        fireEvent.change(numberInput, { target: { value: "10" } });
      }
    );

    then(
      "the number of events displayed should update to match the selected number",
      async () => {
        await waitFor(() => {
          const eventList = screen.getByTestId("event-list");
          expect(eventList.children).toHaveLength(10);
        });
      }
    );
  });

  test("Default number of events", ({ given, then }) => {
    given("the user is on the events page", async () => {
      getEvents.mockResolvedValue(new Array(32).fill({}));
      render(<App />);
    });

    then("the default number of events displayed should be 32", async () => {
      await waitFor(() => {
        const eventList = screen.getByTestId("event-list");
        expect(eventList.children).toHaveLength(32);
      });
    });
  });

  test("User can change number of events multiple times", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the events page", async () => {
      getEvents.mockResolvedValue(new Array(32).fill({}));
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId("event-list")).toBeInTheDocument();
      });
    });

    when("the user selects 10 from the Number of Events dropdown", async () => {
      const numberInput = await screen.findByRole("spinbutton");
      fireEvent.change(numberInput, { target: { value: "10" } });
    });

    then("the number of events displayed should be 10", async () => {
      await waitFor(() => {
        const eventList = screen.getByTestId("event-list");
        expect(eventList.children).toHaveLength(10);
      });
    });

    when("the user selects 20 from the Number of Events dropdown", async () => {
      const numberInput = screen.getByRole("spinbutton");
      fireEvent.change(numberInput, { target: { value: "20" } });
    });

    then("the number of events displayed should be 20", async () => {
      await waitFor(() => {
        const eventList = screen.getByTestId("event-list");
        expect(eventList.children).toHaveLength(20);
      });
    });
  });
});
