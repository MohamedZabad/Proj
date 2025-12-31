// src/pages/GameDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";
import './pages.css';

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [showNotif, setShowNotif] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const API_KEY = "2d99747d4aee400982786843c2083d4b";

  // Fetch game details
  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game details", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGame();
  }, [id]);

  // Check if game is in wishlist
  useEffect(() => {
    if (game) {
      const isGameInWishlist = wishlist.some(item => item.id === game.id);
      setIsInWishlist(isGameInWishlist);
    }
  }, [game, wishlist]);

  // Add game to wishlist (minimal data)
  const addToWishlist = () => {
    const current = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!current.some((g) => g.id === game.id)) {
      const newGame = {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
      };
      const newWishlist = [...current, newGame];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setWishlist(newWishlist);
      setIsInWishlist(true);
    }

    // Show notification popup
    setShowNotif(true);
  };

  // Remove game from wishlist
  const removeFromWishlist = () => {
    const current = JSON.parse(localStorage.getItem("wishlist")) || [];
    const newWishlist = current.filter(item => item.id !== game.id);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlist(newWishlist);
    setIsInWishlist(false);
  };

  // Auto-hide notification after 2 seconds
  useEffect(() => {
    let timer;
    if (showNotif) {
      timer = setTimeout(() => setShowNotif(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [showNotif]);

  if (loading) return <p>Loading game details...</p>;
  if (!game) return <p>Game not found</p>;
  const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i} style={{ color: "gold", fontSize: "20px" }}>★</span>);
  }
  if (halfStar) {
    stars.push(<span key="half" style={{ color: "gold", fontSize: "20px" }}>☆</span>);
  }
  while (stars.length < 5) {
    stars.push(<span key={"empty" + stars.length} style={{ color: "gray", fontSize: "20px" }}>✩</span>);
  }

  return stars;
};
  return (
    <div className="page">
      <h1>{game.name}</h1>

      {game.background_image && (
        <img
          src={game.background_image}
          alt={game.name}
          style={{ width: "400px", borderRadius: "8px", marginBottom: "15px" }}
        />
      )}

      <p><strong>Released:</strong> {game.released}</p>
      <p className="rating">
  Rating: {renderStars(game.rating)} ({game.rating.toFixed(2)})
</p>
      <p>{game.description_raw}</p>

      <button
        onClick={isInWishlist ? removeFromWishlist : addToWishlist}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: isInWishlist ? "#f44336" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>

      {/* Notification Popup */}
      <Notification 
        message={isInWishlist ? "Game added to wishlist!" : "Game removed from wishlist!"} 
        show={showNotif} 
      />
    </div>
  );
}

export default GameDetail;