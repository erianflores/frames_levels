import { createContext, useEffect, useState } from "react";
import axios from "axios";

const GameContext = createContext();

function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ name: "", genre: "" });

  const fetchGames = async (pageNumber = 1, append = false) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5005/api/games/newest?page=${pageNumber}&page_size=20`
      );

      setGames((prevGames) => (append ? [...prevGames, ...data] : data));
    } catch (error) {
      console.error("Error fetching games:", error);
    }
    setLoading(false);
  };

  // Fetch first 20 games on mount
  useEffect(() => {
    fetchGames(1);
  }, []);

  // Function to load more games when scrolling
  const loadMoreGames = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage, true);
    }
  };

  return (
    <GameContext.Provider value={{ games, loadMoreGames, filters, setFilters }}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
