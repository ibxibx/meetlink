import { loadFeature, defineFeature } from "jest-cucumber";
import {
  render,
  waitFor,
  screen,
  within,
  fireEvent,
} from "@testing-library/react";
import App from "../App";

const feature = loadFeature("./src/features/ShowHideEventDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user is on the events page", () => {
      render(<App />);
    });

    when("the user views the event list", async () => {
      await waitFor(() => {
        const eventList = screen.getByTestId("event-list");
        expect(eventList).toBeInTheDocument();
      });
    });

    then("each event element should be collapsed", async () => {
      await waitFor(() => {
        const eventElements = screen.getAllByRole("listitem");
        eventElements.forEach((eventElement) => {
          const detailsButton = within(eventElement).getByRole("button");
          expect(detailsButton).toHaveTextContent("show details");
        });
      });
    });
  });

  test("User can expand an event to see details", ({
    given,
    and,
    when,
    then,
  }) => {
    given("the user is on the events page", () => {
      render(<App />);
    });

    and("an event element is collapsed", async () => {
      await waitFor(() => {
        const eventElements = screen.getAllByRole("listitem");
        expect(eventElements.length).toBeGreaterThan(0);
      });
    });

    when(
      "the user clicks on the Show Details button for an event",
      async () => {
        const showDetailsButton = screen.getAllByText("show details")[0];
        fireEvent.click(showDetailsButton);
      }
    );

    then("the event element should expand to show more details", async () => {
      await waitFor(() => {
        const hideDetailsButton = screen.getByText("hide details");
        expect(hideDetailsButton).toBeInTheDocument();
      });
    });
  });

  test('User can collapse an event to hide details', ({ given, and, when, then }) => {
    given('the user is on the events page', () => {
      render(<App />);
    });

    and('an event element is expanded', async () => {
      await waitFor(() => {
        const eventElements = screen.getAllByRole("listitem");
        expect(eventElements.length).toBeGreaterThan(0);
      });
      const detailsButton = screen.getAllByRole("button", { name: /show details/i })[0];
      fireEvent.click(detailsButton);
      await waitFor(() => {
        const hideDetailsButton = screen.getByRole("button", { name: /hide details/i });
        expect(hideDetailsButton).toBeInTheDocument();
      });
    });

    when('the user clicks on the Hide Details button for an event', async () => {
      const hideDetailsButton = screen.getByRole("button", { name: /hide details/i });
      fireEvent.click(hideDetailsButton);
    });

    then('the event element should collapse to hide the details', async () => {
      await waitFor(() => {
        const showDetailsButton = screen.getAllByRole("button", { name: /show details/i })[0];
        expect(showDetailsButton).toBeInTheDocument();
      });
    });
  });

  test("Change number of events displayed", ({ given, when, then }) => {
    given("the user is on the events page", () => {
      render(<App />);
    });

    when(
      "the user selects a different number from the Number of Events dropdown",
      () => {
        const numberInput = screen.getByLabelText("Number of Events:");
        fireEvent.change(numberInput, { target: { value: "5" } });
      }
    );

    then(
      "the number of events displayed should update to match the selected number",
      async () => {
        await waitFor(
          () => {
            const eventElements = screen.getAllByRole("listitem");
            expect(eventElements.length).toBe(5);
          },
          { timeout: 3000 }
        );
      }
    );
  });
});