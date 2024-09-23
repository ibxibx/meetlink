import mockData from "./mock-data";

const API_BASE_URL =
  "https://ok2j7dg7a0.execute-api.eu-central-1.amazonaws.com/dev/api";

export const extractLocations = (events) => {
  if (!events) return [];
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    if (!response.ok) {
      throw new Error("Token validation failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error checking token:", error);
    return { error: "Token validation failed" };
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get("code");
      if (!code) {
        const response = await fetch(`${API_BASE_URL}/get-auth-url`);
        if (!response.ok) {
          throw new Error("Failed to get auth URL");
        }
        const { authUrl } = await response.json();
        window.location.href = authUrl;
        return null;
      }
      return code && getToken(code);
    }
    return accessToken;
  } catch (error) {
    console.error("Error in getAccessToken:", error);
    return null;
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  try {
    const response = await fetch(`${API_BASE_URL}/token/${encodeCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to get token: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    if (result.access_token) {
      localStorage.setItem("access_token", result.access_token);
      return result.access_token;
    }
    throw new Error("No access token received");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const getEvents = async () => {
  try {
    const token = await getAccessToken();
    if (token) {
      removeQuery();
      const url = `${API_BASE_URL}/get-events/${token}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const result = await response.json();
      if (result && result.events) {
        return result.events;
      }
      throw new Error("No events data in response");
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  // If we're in development mode or if there was an error, return mock data
  if (process.env.NODE_ENV === "development" || !token) {
    console.log("Using mock data");
    return mockData;
  }

  return []; // Return an empty array if we couldn't get events and aren't in development
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState("", "", newurl);
  } else {
    const newurl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState("", "", newurl);
  }
};
