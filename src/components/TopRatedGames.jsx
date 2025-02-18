import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config";

export function TopRatedGames() {
  const [topGames, setTopGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/games/top-games`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopGames(data);
        } else {
          console.error("Unexpected response format:", data);
          setError("Invalid data format received.");
          setTopGames([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching top-rated games:", error);
        setError("Failed to fetch top-rated games.");
        setTopGames([]);
      });
  }, []);

  return (
    <section className="top-rated-games">
      <h2>🏆 Top Rated Games</h2>
      {error ? <p className="error-message">{error}</p> : null}
      <div className="games-list">
        {topGames.length > 0 ? (
          topGames.map((game) => (
            <Link to={`/games/${game._id}`} key={game.id} className="game-card">
              <img
                src={game.background_image}
                alt={game.name}
                className="game-image"
              />
              <p className="game-title">
                <strong>{game.name}</strong>
              </p>
              <p className="game-rating">⭐ {game.rating}/5</p>
            </Link>
          ))
        ) : (
          <p>Loading top-rated games...</p>
        )}
      </div>
    </section>
  );
}

export default TopRatedGames;
