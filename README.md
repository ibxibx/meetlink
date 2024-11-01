# 🤝 MeetLink

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://ibxibx.github.io/meetlink/)

## 🌐 Live Demo
Try out MeetLink here: [https://ibxibx.github.io/meetlink/](https://ibxibx.github.io/meetlink/)

## 📝 Description
MeetLink is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) approach. The app uses the Google Calendar API to fetch upcoming events for a specific city, allowing users to view and interact with event details.

## 🌟 Key Features
1. 🏙️ Filter events by city
2. 📋 Show/hide event details
3. 🔢 Specify number of events
4. 🔌 Use the app when offline
5. 📱 Add an app shortcut to the home screen
6. 📊 Display charts visualizing event details

## 🛠️ Technologies Used
- ⚛️ React
- 📅 Google Calendar API
- ☁️ AWS Lambda (for serverless functions)
- 📃 GitHub Pages (for hosting)
- 🧪 Jest (for testing)
- 📈 Recharts (for data visualization)

## 🏗️ Architecture

![MeetLink Architecture Diagram](https://github.com/ibxibx/meetlink/blob/main/img/Archi_Diagram_MeetLink_App.jpg)

This diagram illustrates the serverless architecture of the MeetLink app:

1. 💻 **User's Device**: Where users interact with the MeetLink React App (PWA).
2. ⚛️ **MeetLink React App**: The frontend of our application, including:
   - 🔄 Service Worker: Enables offline functionality and faster loading.
   - 💾 Local Storage: For caching data and enabling offline use.
3. 🌐 **Amazon API Gateway**: Acts as the entry point for API calls from the app to Lambda functions.
4. ⚡ **AWS Lambda Functions**: Serverless functions handling various operations:
   - 🔐 Authentication Function: Manages user authentication.
   - 📥 Event Retrieval Function: Fetches events from Google Calendar API.
   - ⚙️ Data Processing Function: Processes and filters event data.
5. 📅 **Google Calendar API**: The external service our app interacts with to get event data.

## 📖 User Stories and Scenarios

### 🏙️ Feature 1: Filter Events by City

**User Story**: As a user, I should be able to filter events by city so that I can see the list of events that take place in that city.

**Scenarios**:
1. When user hasn't searched for a city, show upcoming events from all cities
2. User should see a list of suggestions when they search for a city
3. User can select a city from the suggested list

### 📋 Feature 2: Show/Hide Event Details

**User Story**: As a user, I should be able to expand and collapse event details so that I can see more or less information as needed.

**Scenarios**:
1. An event element is collapsed by default
2. User can expand an event to see its details
3. User can collapse an event to hide its details

### 🔢 Feature 3: Specify Number of Events

**User Story**: As a user, I should be able to change the number of events displayed so that I can see more or fewer events at once.

**Scenarios**:
1. When user hasn't specified a number, 30 is the default number
2. User can change the number of events they want to see

### 🔌 Feature 4: Use the App When Offline

**User Story**: As a user, I should be able to access the app's content offline so that I can view event information without an internet connection.

**Scenarios**:
1. Show cached data when there's no internet connection
2. Show error when user changes the settings (city, time range)

### 📱 Feature 5: Add an App Shortcut to the Home Screen

**User Story**: As a user, I should be able to add a shortcut to the app on my device's home screen so that I can access it more quickly and easily.

**Scenarios**:
1. User can install the meet app as a shortcut on their device home screen

### 📊 Feature 6: Display Charts Visualizing Event Details

**User Story**: As a user, I should be able to view charts with event details so that I can get a visual representation of the event data.

**Scenarios**:
1. Show a chart with the number of upcoming events in each city

## ⚙️ Technical Requirements
- ⚛️ React application
- 🧪 Built using the TDD technique
- 🔑 Use of Google Calendar API and OAuth2 authentication flow
- ☁️ Use of serverless functions (AWS lambda) for the authorization server
- 📃 Hosted on GitHub Pages
- 📱 Responsive design (works on mobile and desktop devices)
- ✅ Passes Lighthouse's PWA checklist
- 🔌 Works offline or with slow network connections using a service worker
- 🎯 Implements an alert system using an OOP approach
- 📊 Makes use of data visualization (recharts library)
- 🧪 Covered by tests with a coverage rate >= 90%
- 📈 Monitored using an online performance monitoring tool

## 🚀 Setup Instructions

### 📋 Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Calendar API credentials

### 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/ibxibx/meetlink.git
cd meetlink
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Calendar API credentials:
```
REACT_APP_GOOGLE_API_KEY=your_api_key
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
```

4. Start the development server:
```bash
npm start
```

### 🏗️ Building for Production

To create a production build:
```bash
npm run build
```

### 🧪 Running Tests
```bash
npm test
```

To view test coverage:
```bash
npm test -- --coverage
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
