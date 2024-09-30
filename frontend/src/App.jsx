import { useState } from "react";
import "./App.css";
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<LandingPage />} />

      </Routes>
  </Router>
  );
}

export default App;
