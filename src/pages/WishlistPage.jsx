import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameCard from "../components/GameCard";
import { AuthContext } from "../contexts/auth.context";
import axios from "axios";
import { API_URL } from "../config/config";
import { Spinner } from "../components/Spinner";
import Footer from "../components/Footer";

const Wishlist = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [wishedGames, setWishedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const fetchWishedGames = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/users/${user._id}/wishlist`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json", // This line helps with CORS
            },
          }
        );

        setWishedGames(data); // Directly set data from the response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishedGames();
  }, [user?._id]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Wishlist</h1>
      <div className="game-list">
        {wishedGames.length > 0 ? (
          wishedGames.map((game) => <GameCard key={game._id} game={game} />)
        ) : (
          <p>No owned games yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
