import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  const renderEventComponent = (eventData = allEvents[0]) => {
    render(<Event event={eventData} />);
  };

  test("renders event title", () => {
    renderEventComponent();
    expect(screen.getByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test("renders event start time", () => {
    renderEventComponent();
    const startTime = new Date(allEvents[0].start.dateTime).toLocaleString();
    expect(screen.getByText(startTime)).toBeInTheDocument();
  });

  test("renders event location", () => {
    renderEventComponent();
    expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    renderEventComponent();
    expect(screen.getByText("show details")).toBeInTheDocument();
  });

  test("renders all necessary elements", () => {
    renderEventComponent();
    expect(screen.getByText(allEvents[0].summary)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(allEvents[0].start.dateTime).toLocaleString())
    ).toBeInTheDocument();
    expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();
    expect(screen.getByText("show details")).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    renderEventComponent();
    expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    renderEventComponent();
    const showDetailsButton = screen.getByText("show details");
    fireEvent.click(showDetailsButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-details")).toBeInTheDocument();
    });

    expect(screen.getByText("hide details")).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    renderEventComponent();
    const showDetailsButton = screen.getByText("show details");
    fireEvent.click(showDetailsButton);

    const hideDetailsButton = screen.getByText("hide details");
    fireEvent.click(hideDetailsButton);

    await waitFor(() => {
      expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
    });

    expect(screen.getByText("show details")).toBeInTheDocument();
  });

  test("displays 'Date not available' when event start date is missing", () => {
    const eventWithoutDate = {
      summary: "Test Event",
      location: "Test Location",
      description: "Test Description",
    };

    renderEventComponent(eventWithoutDate);

    expect(screen.getByText("Date not available")).toBeInTheDocument();
  });

  test("correctly formats and displays the event date and time when available", () => {
    const eventWithDate = {
      summary: "Test Event",
      location: "Test Location",
      description: "Test Description",
      start: {
        dateTime: "2023-07-01T19:00:00+02:00",
      },
    };

    renderEventComponent(eventWithDate);

    const dateTimeElement = screen.getByText((content, element) => {
      // This function will check if the content includes both a date and time
      const hasDate = /\d{1,2}\/\d{1,2}\/\d{4}/.test(content);
      const hasTime = /\d{2}:\d{2}:\d{2}/.test(content);
      return hasDate && hasTime;
    });

    expect(dateTimeElement).toBeInTheDocument();

    // Additional checks to ensure correct date and time
    expect(dateTimeElement.textContent).toContain("2023");
    expect(dateTimeElement.textContent).toContain("19:00:00");
  });
});
