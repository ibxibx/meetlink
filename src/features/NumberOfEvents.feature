Feature: Specify Number of Events

 Scenario: Change number of events displayed
  Given the user is on the events page
  When the user selects a different number from the Number of Events dropdown
  Then the number of events displayed should update to match the selected number

 Scenario: Default number of events
  Given the user is on the events page
  Then the default number of events displayed should be 32

 Scenario: User can change number of events multiple times
  Given the user is on the events page
  When the user selects 10 from the Number of Events dropdown
  Then the number of events displayed should be 10
  When the user selects 20 from the Number of Events dropdown
  Then the number of events displayed should be 20