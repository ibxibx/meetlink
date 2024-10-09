import React, { useState, useEffect, useCallback } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import "./App.css";
import * as atatus from "atatus-spa";
import logo from "./img/meetlink_logo.png";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    atatus.notify(new Error("Test Atatus on Production"));
    const updateWarningAlert = () => {
      if (navigator.onLine) {
        setWarningAlert("");
      } else {
        setWarningAlert(
          "You are currently offline. The event list may not be up to date."
        );
      }
    };
    window.addEventListener("online", updateWarningAlert);
    window.addEventListener("offline", updateWarningAlert);
    updateWarningAlert(); // Initial check
    return () => {
      window.removeEventListener("online", updateWarningAlert);
      window.removeEventListener("offline", updateWarningAlert);
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === "See all cities"
          ? allEvents
          : allEvents.filter((event) =>
              event.location.toUpperCase().includes(currentCity.toUpperCase())
            );

      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));

      if (filteredEvents.length === 0) {
        setInfoAlert("No events found for the selected city.");
      } else {
        setInfoAlert("");
      }
    } catch (error) {
      setErrorAlert("Error fetching events. Please try again later.");
    }
  }, [currentCity, currentNOE]);

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE, fetchData]);

  const handleNumberOfEventsChange = (value) => {
    if (isNaN(value) || value <= 0) {
      setErrorAlert("Please enter a number greater than 0.");
    } else {
      setErrorAlert("");
      setCurrentNOE(Number(value));
    }
  };

  return (
    <div className="App">
      <nav className="nav-bar">
        <img src={logo} alt="MeetLink Logo" className="nav-logo" />
      </nav>
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        setCurrentNOE={handleNumberOfEventsChange}
        currentNOE={currentNOE}
      />
      <EventList events={events} />
    </div>
  );
};

export default App;
