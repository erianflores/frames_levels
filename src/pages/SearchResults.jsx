import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { API_URL } from "../config/config";

function SearchResults() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div className="game-search-page">
      <h2>Search Results for: "{query}"</h2>
      <div className="game-list">
        {searchResults.length > 0 ? (
          searchResults.map((game) => <GameCard key={game._id} game={game} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
