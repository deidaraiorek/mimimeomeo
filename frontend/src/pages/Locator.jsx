import React, { useContext, useState, useEffect } from "react";
import { WebSocketContext } from "../WebSocketContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Locator = () => {
  const {
    connected,
    partnerLocation,
    error,
    lastUpdated,
    requestPartnerLocation,
    setError,
  } = useContext(WebSocketContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (partnerLocation !== null || error) {
      setLoading(false);
    }
  }, [partnerLocation, error]);

  const handleRequestLocation = () => {
    setLoading(true);
    setError(null);
    requestPartnerLocation();
  };

  const [latitude, longitude] = partnerLocation
    ? partnerLocation.split(",").map(Number)
    : [];

  return (
    <div className="flex flex-col items-center p-8 max-w-4xl mx-auto">
      {/* Connection Status Card */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span
          className={`inline-block w-3 h-3 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          } animate-pulse`}
        ></span>
        <span className="text-gray-600">
          You are {connected ? "connected" : "disconnected"}
        </span>
      </div>

      {/* Request Button */}
      <button
        className={`
          px-8 py-4 rounded-full text-xl font-bold shadow-lg
          transition-all duration-300 mb-8 w-64
          ${
            !connected || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:shadow-xl hover:scale-105"
          }
        `}
        onClick={handleRequestLocation}
        disabled={!connected || loading}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        ) : (
          "Find Partner"
        )}
      </button>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-sm text-gray-500 mb-4 font-medium">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}

      {/* Loading Message */}
      {loading && (
        <div className="text-lg text-purple-500 mb-6 animate-pulse">
          Searching for partner's location...
        </div>
      )}

      {/* Map Container */}
      {!loading && partnerLocation && latitude && longitude && (
        <div className="w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
              <Popup>
                <div className="text-center p-2">
                  <span className="font-semibold text-pink-500">
                    Partner's Location
                  </span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
          <div className="flex items-center text-red-500">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locator;
