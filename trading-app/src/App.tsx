import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./webpages/Login";
import TradingPage from "./webpages/TradingPage";
import Home from "./webpages/Home";
import Search from "./webpages/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trading" element={<TradingPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
