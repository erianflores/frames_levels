import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { API_URL } from "../config/config";
import { GameContext } from "../contexts/game.context";
import Footer from "../components/Footer";

function SearchResults() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const { filters } = useContext(GameContext);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/games/search?query=${query}`
        );
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    if (query) fetchResults();
  }, [query]);

  const filteredResults = searchResults.filter((game) => {
    const matchesGenre =
      !filters.genres?.length ||
      game.genres.some((genre) => filters.genres.includes(genre.name));

    const matchesPlatform =
      !filters.platforms?.length ||
      game.platforms.some((p) => filters.platforms.includes(p.platform.name));

    return matchesGenre && matchesPlatform;
  });

  return (
    <div className="game-search-page">
      <h2>Search Results for: "{query}"</h2>
      <div className="game-list-search">
        {filteredResults.length > 0 ? (
          filteredResults.map((game) => <GameCard key={game._id} game={game} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResults;
