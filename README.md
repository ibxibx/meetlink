# MeetLink

## Live Demo Link:

https://ibxibx.github.io/meetlink/

## Description
MeetLink is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) approach. The app uses the Google Calendar API to fetch upcoming events for a specific city, allowing users to view and interact with event details.

## Key Features
1. Filter events by city
2. Show/hide event details
3. Specify number of events
4. Use the app when offline
5. Add an app shortcut to the home screen
6. Display charts visualizing event details

## Technologies Used
- React
- Google Calendar API
- AWS Lambda (for serverless functions)
- GitHub Pages (for hosting)
- Jest (for testing)
- Recharts (for data visualization)

## User Stories and Scenarios

### Feature 1: Filter Events by City

User Story: As a user, I should be able to filter events by city so that I can see the list of events that take place in that city.

Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.
Given user hasn't searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city.

Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities suggestions that match what they've typed

Scenario 3: User can select a city from the suggested list.

Given the user was typing "Berlin" in the city textbox
And the list of suggested cities is showing
When the user selects a city (ex: "Berlin, Germany") from the list
Then their city should be changed to that city (ex: "Berlin, Germany")
And the user should receive a list of upcoming events in that city

### Feature 2: Show/Hide Event Details

User Story: As a user, I should be able to expand and collapse event details so that I can see more or less information as needed.

Scenario 1: An event element is collapsed by default

Given the user is on the main page
When an event is displayed
Then the event details should be collapsed

Scenario 2: User can expand an event to see its details

Given the user is viewing a collapsed event
When the user clicks on the event
Then the event details should be expanded and visible

Scenario 3: User can collapse an event to hide its details

Given the user is viewing an expanded event
When the user clicks on the "Hide details" button
Then the event details should collapse and be hidden

### Feature 3: Specify Number of Events

User Story: As a user, I should be able to change the number of events displayed so that I can see more or fewer events at once.

Scenario 1: When user hasn't specified a number, 30 is the default number

Given the user hasn't specified the number of events to display
When the user views the events list
Then 30 events should be displayed by default

Scenario 2: User can change the number of events they want to see

Given the user is on the events page
When the user specifies a number of events to display
Then the app should display that number of events

### Feature 4: Use the App When Offline

User Story: As a user, I should be able to access the app's content offline so that I can view event information without an internet connection.

Scenario 1: Show cached data when there's no internet connection

Given the user has previously loaded the app and event data
When the user loses internet connection
Then the user should still be able to view the previously loaded events

Scenario 2: Show error when user changes the settings (city, time range)

Given the user is offline
When the user attempts to change settings that require new data from the server
Then the app should display an error message

### Feature 5: Add an App Shortcut to the Home Screen

User Story: As a user, I should be able to add a shortcut to the app on my device's home screen so that I can access it more quickly and easily.

Scenario 1: User can install the meet app as a shortcut on their device home screen

Given the user is using a supported mobile device
When the user selects the option to add the app to the home screen
Then a shortcut to the app should appear on the user's home screen

### Feature 6: Display Charts Visualizing Event Details

User Story: As a user, I should be able to view charts with event details so that I can get a visual representation of the event data.

Scenario 1: Show a chart with the number of upcoming events in each city

Given the user is on the events page
When the user navigates to the "Charts" section
Then the user should see a chart displaying the number of upcoming events in each city

## Technical Requirements
- React application
- Built using the TDD technique
- Use of Google Calendar API and OAuth2 authentication flow
- Use of serverless functions (AWS lambda) for the authorization server
- Hosted on GitHub Pages
- Responsive design (works on mobile and desktop devices)
- Passes Lighthouse's PWA checklist
- Works offline or with slow network connections using a service worker
- Implementats an alert system using an OOP approach
- Makes use of data visualization (recharts library)
- Covered by tests with a coverage rate >= 90%
- Monitored using an online performance monitoring tool