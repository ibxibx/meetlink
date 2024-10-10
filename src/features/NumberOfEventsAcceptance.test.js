import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/NumberOfEvents.feature");

jest.mock("../api");

const mockEvents = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  summary: `Event ${i + 1}`,
}));

jest.setTimeout(30000);

defineFeature(feature, (test) => {
  beforeEach(() => {
    getEvents.mockClear();
    getEvents.mockResolvedValue(mockEvents);
  });

  test("Change number of events displayed", ({ given, when, then }) => {
    given("the user is on the events page", async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId("event-list")).toBeInTheDocument();
      });
    });

    when(
      "the user selects a different number from the Number of Events dropdown",
      async () => {
        const numberInput = await screen.findByLabelText("Number of Events:");
        fireEvent.change(numberInput, { target: { value: "10" } });
      }
    );

    then(
      "the number of events displayed should update to match the selected number",
      async () => {
        await waitFor(() => {
          const eventItems = screen.getAllByRole("listitem");
          expect(eventItems).toHaveLength(10);
        });
      }
    );
  });

  test("Default number of events", ({ given, then }) => {
    given("the user is on the events page", async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId("event-list")).toBeInTheDocument();
      });
    });

    then(
      /^the default number of events displayed should be (\d+)$/,
      async (arg0) => {
        await waitFor(() => {
          const eventItems = screen.getAllByRole("listitem");
          expect(eventItems).toHaveLength(Number(arg0));
        });
      }
    );
  });

  test("User can change number of events multiple times", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the events page", async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId("event-list")).toBeInTheDocument();
      });
    });

    when(
      /^the user selects (\d+) from the Number of Events dropdown$/,
      async (number) => {
        const numberInput = await screen.findByLabelText("Number of Events:");
        fireEvent.change(numberInput, { target: { value: number } });
      }
    );

    then(/^the number of events displayed should be (\d+)$/, async (number) => {
      await waitFor(() => {
        const eventItems = screen.getAllByRole("listitem");
        expect(eventItems).toHaveLength(Number(number));
      });
    });

    when(
      /^the user selects (\d+) from the Number of Events dropdown$/,
      async (number) => {
        const numberInput = await screen.findByLabelText("Number of Events:");
        fireEvent.change(numberInput, { target: { value: number } });
      }
    );

    then(/^the number of events displayed should be (\d+)$/, async (number) => {
      await waitFor(() => {
        const eventItems = screen.getAllByRole("listitem");
        expect(eventItems).toHaveLength(Number(number));
      });
    });
  });
});
