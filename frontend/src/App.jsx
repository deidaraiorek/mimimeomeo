import { useState } from "react";
import "./App.css";
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import SpecialDates from "./pages/features/SpecialDates";



function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/specialdate" element={<SpecialDates/>} />

      </Routes>
  </Router>
  );
}

export default App;
