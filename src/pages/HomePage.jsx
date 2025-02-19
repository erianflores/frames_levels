import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FeaturedGames } from "../components/FeaturedGames";
import GameList from "../components/GameList";
import { TopRatedGames } from "../components/TopRatedGames";
import { Spinner } from "../components/Spinner";

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      new Promise((resolve) => setTimeout(resolve, 1000)), 
    ]).then(() => setLoading(false));
  }, []);

  const handleJoinUs = () => {
    navigate("/signup");
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="home-page">
      <button className="join-us-button" onClick={handleJoinUs}>
        Join Us!
      </button>
      <FeaturedGames />
      <TopRatedGames />
      <GameList />
    </div>
  );
}

export default HomePage;
