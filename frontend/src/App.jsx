import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoupleNote from "./pages/features/CoupleNote";
import "./App.css";
import Header from "./components/landing/Header";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import SpecialDates from "./pages/features/SpecialDates";
import Invitation from "./pages/Invitation";
import Gallery from "./pages/features/gallery/Gallery";
import Album from "./pages/features/gallery/Album";
import ForgotPassword from "./pages/auth/resetpassword/ForgotPassword";
import CheckEmail from "./pages/auth/resetpassword/CheckEmail";
import SetNewPassword from "./pages/auth/resetpassword/SetNewPasswprd";
import ConfirmNewPassword from "./pages/auth/resetpassword/ConfirmNewPassword";
import Locator from "./pages/Locator";
import { WebSocketProvider } from "./WebSocketContext";

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/specialdate" element={<SpecialDates />} />
          <Route path="/notes/*" element={<CoupleNote />} />
          <Route path="/invite" element={<Invitation />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/album/:albumName" element={<Album />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword/checkemail" element={<CheckEmail />} />
          <Route path="/forgotpassword/setnewpw" element={<SetNewPassword />} />
          <Route
            path="/forgotpassword/confirmnewpw"
            element={<ConfirmNewPassword />}
          />
          <Route path="/locator" element={<Locator />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
