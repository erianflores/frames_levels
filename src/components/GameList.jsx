import { useContext, useEffect, useRef, useCallback } from "react";
import { GameContext } from "../contexts/game.context";
import GameCard from "./GameCard";

function GameList() {
  const { games, loadMoreGames } = useContext(GameContext);
  const observer = useRef();

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
      {games.map((game, index) => (
        <div
          ref={index === games.length - 1 ? lastGameRef : null}
          key={game._id}
        >
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}

export default GameList;
