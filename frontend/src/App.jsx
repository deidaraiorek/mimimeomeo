import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoupleNote from "./pages/CoupleNote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/couplenote" element={<CoupleNote />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
