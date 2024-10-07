import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoupleNote from "./pages/CoupleNote";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/notes/*" element={<CoupleNote />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
