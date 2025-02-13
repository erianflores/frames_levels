import { useNavigate } from "react-router-dom";
import { FeaturedGames } from "../components/FeaturedGames";
import GameList from "../components/GameList";
import { TopRatedGames } from "../components/TopRatedGames";

function HomePage() {
  const navigate = useNavigate();

  const handleJoinUs = () => {
     navigate("/signup"); 
  };
  return (
    <div className="home-page">
      <h2 className="welcome-message">Welcome to the Homepage</h2>
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
