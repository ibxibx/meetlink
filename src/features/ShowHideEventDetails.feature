Feature: Show/Hide Event Details
 Scenario: An event element is collapsed by default
  Given the user is on the events page
  When the user views the event list
  Then each event element should be collapsed

 Scenario: User can expand an event to see details
  Given the user is on the events page
  And an event element is collapsed
  When the user clicks on the Show Details button for an event
  Then the event element should expand to show more details

 Scenario: User can collapse an event to hide details
  Given the user is on the events page
  And an event element is expanded
  When the user clicks on the Hide Details button for an event
  Then the event element should collapse to hide the details
  
 Scenario: Change number of events displayed
   Given the user is on the events page
   When the user selects a different number from the Number of Events dropdown
   Then the number of events displayed should update to match the selected number