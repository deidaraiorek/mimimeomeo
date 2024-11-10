import React, { createContext, useEffect, useRef, useState } from "react";
import { API_ROUTES } from "./constants/apiRoutes";

export const WebSocketContext = createContext(null);

let socket; // Declare socket outside the component to make it a singleton

export const WebSocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [partnerLocation, setPartnerLocation] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [userId, setUserId] = useState(null);
  console.log("WebSocketProvider rendered", connected);

  useEffect(() => {
    // Only initialize the WebSocket if it hasn't been initialized yet
    if (!connected) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) {
        setUserId(user.id);
        socket = new WebSocket(API_ROUTES.WS_CONNECT);

        socket.onopen = () => {
          console.log("WebSocket connection established");
          socket.send(JSON.stringify({ action: "CONNECT", userId: user.id }));
          setConnected(true);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.action === "GET_LOCATION") {
              handleLocationRequest(data.requesterId);
            } else if (data.location) {
              setPartnerLocation(data.location);
              setLastUpdated(new Date().toISOString());
              setError(null);
            } else if (data.error || data.message) {
              setError(data.error || data.message);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        socket.onclose = () => {
          console.log("WebSocket connection closed");
          setConnected(false);
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          setError("WebSocket error");
        };
      }
    }

    return () => {
      // Do not close the socket here since we want it to persist
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleLocationRequest = (requesterId) => {
    console.log("Location request received from:", requesterId);
    if (navigator.geolocation) {
      console.log("Requesting location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          sendMessage({
            action: "SEND_LOCATION",
            requesterId,
            location,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          sendMessage({
            action: "SEND_LOCATION",
            requesterId,
            location: "Location unavailable",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 50000,
          maximumAge: 0,
        }
      );
    } else {
      sendMessage({
        action: "SEND_LOCATION",
        requesterId,
        location: "Geolocation not supported",
      });
    }
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
      setError("WebSocket is not connected");
    }
  };

  const requestPartnerLocation = () => {
    if (userId) {
      sendMessage({ action: "REQUEST_LOCATION", userId });
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        connected,
        partnerLocation,
        error,
        lastUpdated,
        setError,
        requestPartnerLocation,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
