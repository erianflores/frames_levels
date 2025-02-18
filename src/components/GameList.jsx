import { useContext, useEffect, useRef, useCallback } from "react";
import { GameContext } from "../contexts/game.context";
import GameCard from "./GameCard";

function GameList() {
  const { games, loadMoreGames, filters } = useContext(GameContext);
  const observer = useRef();

  const filteredGames = games.filter((game) => {
    if (!filters.genres || filters.genres.length === 0) {
      return true; // Show all games if no genre filters are selected
    }
    return game.genres.some((genre) => filters.genres.includes(genre.name));
  });

  // Callback for infinite scrolling
  const lastGameRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreGames();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadMoreGames]
  );

  return (
    <div className="game-list">
      {filteredGames.map((game, index) => (
        <div
          ref={index === filteredGames.length - 1 ? lastGameRef : null}
          key={game._id}
        >
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}

export default GameList;
