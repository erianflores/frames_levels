import { useContext, useEffect, useRef, useCallback } from "react";
import { GameContext } from "../contexts/game.context";
import GameCard from "./GameCard";

function GameList() {
  const { games, loadMoreGames, filters } = useContext(GameContext);
  const observer = useRef();

  const filteredGames = games.filter((game) => {
    // Genre filtering
    const matchesGenre =
      !filters.genres?.length ||
      game.genres.some((genre) => filters.genres.includes(genre.name));

    // Platform filtering
    const matchesPlatform =
      !filters.platforms?.length ||
      game.platforms.some((p) => filters.platforms.includes(p.platform.name));

    return matchesGenre && matchesPlatform;
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
