import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import './pages.css';

function FreeGames() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [platformFilter, setPlatformFilter] = useState('All'); // Platform filter
  const [genreFilter, setGenreFilter] = useState('All');       // Genre filter
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 40;

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/freegames");
      setGames(response.data);
      setHasMore(response.data.length > PAGE_SIZE);
      setPage(1);
    } catch (error) {
      console.error("Error fetching free games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Filter games
  const filteredGames = games
    .filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter(game =>
      platformFilter === 'All' ? true : game.platform === platformFilter
    )
    .filter(game =>
      genreFilter === 'All' ? true : game.genre === genreFilter
    );

  // Pagination
  const paginatedGames = filteredGames.slice(0, page * PAGE_SIZE);
  const loadMore = () => setPage(prev => prev + 1);

  // Extract unique platforms and genres for dropdowns
  const platforms = ['All', ...Array.from(new Set(games.map(g => g.platform)))];
  const genres = ['All', ...Array.from(new Set(games.map(g => g.genre)))];

  return (
    <div className="page">
      <h1 className="page-title"><FaGamepad /> Free Games</h1>
      <SearchBar query={query} setQuery={setQuery} />

     <div className="filter-controls" style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  alignItems: 'center',
  margin: '20px 0',
  fontSize: '18px',
  flexWrap: 'wrap'
}}>
  <div>
    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Platform:</label>
    <select 
      value={platformFilter} 
      onChange={(e) => setPlatformFilter(e.target.value)}
      style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '6px' }}
    >
      {platforms.map(p => <option key={p} value={p}>{p}</option>)}
    </select>
  </div>

  <div>
    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Genre:</label>
    <select 
      value={genreFilter} 
      onChange={(e) => setGenreFilter(e.target.value)}
      style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '6px' }}
    >
      {genres.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  </div>
</div>


      <h2 style={{ color: "#adff2f", textAlign: "center", margin: "20px 0" }}>
        {filteredGames.length} results found
      </h2>

      {loading && <p>Loading free games...</p>}

      <ul className="game-list">
        {paginatedGames.map(game => (
          <li key={game.id} className="game-card">
            <Link to={`/game/${game.id}`} className="game-title">
              <h3>{game.title}</h3>
            </Link>
            <p><strong>Genre:</strong> {game.genre}</p>
            <p><strong>Platform:</strong> {game.platform}</p>
            <img src={game.thumbnail} alt={game.title} />
            <a href={game.game_url} target="_blank" rel="noopener noreferrer">Play Now</a>
          </li>
        ))}
      </ul>

      {hasMore && paginatedGames.length < filteredGames.length && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default FreeGames;
