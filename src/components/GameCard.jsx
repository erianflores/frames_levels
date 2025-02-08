import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <div className="game-card">
      <Link to={`/games/${game._id}`} key={game._id}>
        <img
          src={game.background_image}
          alt={game.name}
          className="game-image"
        />
        <div className="game-info">
          <h3>{game.name}</h3>
          <p>Released: {new Date(game.released).toDateString()}</p>
          <p>Rating: ⭐ {game.rating} / 5</p>
        </div>
      </Link>
    </div>
  );
}

export default GameCard;
