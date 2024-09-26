import React, { useState, useEffect, useCallback } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import "./App.css";
import * as atatus from "atatus-spa";

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
  }, []);

  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) =>
            event.location.toUpperCase().includes(currentCity.toUpperCase())
          );
    setEvents(filteredEvents ? filteredEvents.slice(0, currentNOE) : []);
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are offline. The event list may not be up to date.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

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
        <img
          src="/img/meetlink_logo.png"
          alt="MeetLink Logo"
          className="nav-logo"
        />
      </nav>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
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
