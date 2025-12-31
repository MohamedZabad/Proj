import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import GameDetail from "./pages/GameDetail"; 
import FreeGames from "./pages/FreeGames";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/free-games" element={<FreeGames />} />
        <Route path="/game/:id" element={<GameDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
