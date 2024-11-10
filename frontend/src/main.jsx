// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { WebSocketProvider } from "./WebSocketContext";
import "./index.css";

ReactDOM.render(
  <WebSocketProvider>
    <App />
  </WebSocketProvider>,
  document.getElementById("root")
);
