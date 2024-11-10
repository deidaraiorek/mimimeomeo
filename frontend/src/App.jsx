import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoupleNote from "./pages/CoupleNote";
import "./App.css";
import Header from "./components/landing/Header";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import SpecialDates from "./pages/SpecialDates";
import Invitation from "./pages/Invitation";
import Locator from "./pages/Locator";
import { WebSocketProvider } from "./WebSocketContext"; // Import the WebSocketProvider

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/specialdate" element={<SpecialDates />} />
        <Route path="/notes/*" element={<CoupleNote />} />
        <Route path="/invite" element={<Invitation />} />
        <Route path="/locate" element={<Locator />} />
      </Routes>
    </Router>
  );
}

export default App;
