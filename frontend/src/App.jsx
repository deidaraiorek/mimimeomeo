import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TextEditor from "./components/TextEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/text-editor" element={<TextEditor />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
