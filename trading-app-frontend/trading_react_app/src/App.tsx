import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./webpages/Login";
import TradingPage from "./webpages/TradingPage";
import Signup from "./webpages/Signup";
import Profile from "./webpages/Profile";
import ErrorPage from "./components/ErrorPage";

// Initialize the "active" status based on sessionStorage
const initializeActiveStatus = () => {
  const isFirstVisit = sessionStorage.getItem("firstVisit");

  if (!isFirstVisit) {
    // If "firstVisit" is not set, this is the user's first visit
    sessionStorage.setItem("firstVisit", JSON.stringify(true));
    sessionStorage.setItem("active", JSON.stringify(false));
  } else {
    // If "firstVisit" is already set, we don't need to update "active" status
    sessionStorage.setItem("firstVisit", JSON.stringify(false));
  }
};

// Call the initialization function when the module is loaded
initializeActiveStatus();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TradingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/invalid-page" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
