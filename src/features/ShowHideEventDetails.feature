Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default
  Given the user is viewing the event list
  Then the event details should be hidden

Scenario: User can expand an event to see details
  Given the user is viewing the event list
  When the user clicks on the show details button for an event
  Then the event details should be visible for that event

Scenario: User can collapse an event to hide details
  Given the user is viewing an expanded event
  When the user clicks on the hide details button for the event
  Then the event details should be hidden for that event