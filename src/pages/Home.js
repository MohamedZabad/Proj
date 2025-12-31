import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from '../components/SearchBar';
import { FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import './pages.css';

function Home() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('name'); // default: name
  const [sortOrder, setSortOrder] = useState('asc'); // asc / desc
  const [page, setPage] = useState(1); // for pagination
  const [hasMore, setHasMore] = useState(true); // track if more pages exist

  const API_KEY = '2d99747d4aee400982786843c2083d4b';
  const PAGE_SIZE = 40; // max per page

  // Fetch games from RAWG
  const fetchGames = async (searchQuery = '', pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}&page=${pageNum}&page_size=${PAGE_SIZE}`;
      const response = await axios.get(url);

      if (append) {
        setGames(prev => [...prev, ...response.data.results]);
      } else {
        setGames(response.data.results);
      }

      // Check if more pages exist
      setHasMore(response.data.results.length === PAGE_SIZE);

    } catch (error) {
      console.error("Error fetching games: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchGames(query, 1, false);
    setPage(1);
  }, [query]);

  // Sorting logic
  const sortGames = (games) => {
    return [...games].sort((a, b) => {
      let valA = a[sortOption] || '';
      let valB = b[sortOption] || '';

      if (sortOption === 'name') return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      if (sortOption === 'rating') return sortOrder === 'asc' ? valA - valB : valB - valA;
      if (sortOption === 'released') return sortOrder === 'asc' ? new Date(valA) - new Date(valB) : new Date(valB) - new Date(valA);
      return 0;
    });
  };

  const sortedGames = sortGames(games);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchGames(query, nextPage, true);
    setPage(nextPage);
  };

  return (
    <div className="page">
      <h1 className="page-title"><FaGamepad /> GameHub</h1>
      <SearchBar query={query} setQuery={setQuery} />

      <div className="sort-controls">
        <label>Sort by: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="released">Release Date</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '⬆ Asc' : '⬇ Desc'}
        </button>
      </div>

      <h2 style={{ color: "#adff2f", textAlign: "center", margin: "20px 0" }}>
        {sortedGames.length} results found
      </h2>

      {loading && <p>Loading games...</p>}

      <ul className="game-list">
        {sortedGames.map((game) => (
          <li key={game.id} className="game-card">
            <Link to={`/game/${game.id}`} className="game-title">
              <h3>{game.name}</h3>
            </Link>
            <p className="game-info">Released: <span className="game-info-value">{game.released}</span></p>
            <p className="game-info">Rating: <span className="game-info-value">{game.rating}</span></p>
            {game.background_image && (
              <Link to={`/game/${game.id}`} className="game-image-link" aria-label={`View ${game.name} details`}>
                <img src={game.background_image} alt={game.name} className="game-image" />
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Load more button */}
      {hasMore && !loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default Home;
