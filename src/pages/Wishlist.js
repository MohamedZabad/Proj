import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './pages.css';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="page">
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="empty-message">Your wishlist is empty...</p>
      ) : (
        <ul className="game-list">
          {wishlist.map((game) => (
            <li key={game.id} className="game-card">
              <Link to={`/game/${game.id}`}>
                <h3>{game.name}</h3>
                {game.image && <img src={game.image} alt={game.name} width="200" />}
                <p>Released: {game.released}</p>
                <p>Rating: {game.rating}</p>
              </Link>
              <button onClick={() => removeFromWishlist(game.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;
