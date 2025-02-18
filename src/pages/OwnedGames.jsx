import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameCard from "../components/GameCard"; // Adjust path if needed
import { AuthContext } from "../contexts/auth.context";

const OwnedGames = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [ownedGames, setOwnedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const fetchOwnedGames = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users/${user._id}/owned`
        );
        if (!response.ok) throw new Error("Failed to fetch owned games");
        const data = await response.json();
        setOwnedGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedGames();
  }, [user?._id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Owned Games</h1>
      <div className="game-list">
        {ownedGames.length > 0 ? (
          ownedGames.map((game) => <GameCard key={game._id} game={game} />)
        ) : (
          <p>No owned games yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnedGames;
