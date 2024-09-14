import React from "react";
import { render, within, fireEvent, waitFor } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("renders event title", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event start time", () => {
    const startTime = new Date(allEvents[0].start.dateTime).toLocaleString();
    expect(EventComponent.queryByText(startTime)).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
  });

  test("renders all necessary elements", () => {
    const { container } = EventComponent;

    // Check for title element
    const titleElement = container.querySelector(".event-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe(allEvents[0].summary);

    // Check for start time element
    const startTimeElement = container.querySelector(".event-start-time");
    expect(startTimeElement).toBeInTheDocument();
    expect(startTimeElement.textContent).toBe(
      new Date(allEvents[0].start.dateTime).toLocaleString()
    );

    // Check for location element
    const locationElement = container.querySelector(".event-location");
    expect(locationElement).toBeInTheDocument();
    expect(locationElement.textContent).toBe(allEvents[0].location);

    // Check for show details button
    const showDetailsButton = container.querySelector(".details-btn");
    expect(showDetailsButton).toBeInTheDocument();
    expect(showDetailsButton.textContent).toBe("show details");
  });

  test("by default, event's details section should be hidden", () => {
    const details = EventComponent.queryByTestId("event-details");
    expect(details).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const showDetailsButton = EventComponent.getByText("show details");
    fireEvent.click(showDetailsButton);

    await waitFor(() => {
      const details = EventComponent.queryByTestId("event-details");
      expect(details).toBeInTheDocument();
    });

    const hideDetailsButton = EventComponent.getByText("hide details");
    expect(hideDetailsButton).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    // First, show the details
    const showDetailsButton = EventComponent.getByText("show details");
    fireEvent.click(showDetailsButton);

    // Then, hide the details
    const hideDetailsButton = EventComponent.getByText("hide details");
    fireEvent.click(hideDetailsButton);

    await waitFor(() => {
      const details = EventComponent.queryByTestId("event-details");
      expect(details).not.toBeInTheDocument();
    });

    const newShowDetailsButton = EventComponent.getByText("show details");
    expect(newShowDetailsButton).toBeInTheDocument();
  });
});
