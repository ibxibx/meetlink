Feature: Filter events by city

Scenario: Show upcoming events from all cities by default
  Given the user has not searched for any city
  When the user opens the app
  Then the user should see a list of upcoming events

Scenario: User can search for events in a specific city
  Given the user is on the main page
  When the user searches for a specific city
  Then the user should see a list of events in that city