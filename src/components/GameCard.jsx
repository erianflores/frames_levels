import { Link } from "react-router-dom";

function GameCard({ game }) {
  const releaseDate = new Date(game.released);
  const formattedDate = `${
    releaseDate.getMonth() + 1
  }/${releaseDate.getDate()}/${releaseDate.getFullYear()}`;
  console.log("GameCard recieved game:", game);

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
          <div className="extra-info">
            <p className="released-info">Released: {formattedDate}</p>
            <p className="rating-info">Rating: ⭐ {game.rating} / 5</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GameCard;
