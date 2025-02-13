import { FeaturedGames } from "../components/FeaturedGames";
import GameList from "../components/GameList";
import { TopRatedGames } from "../components/TopRatedGames";

function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to the Homepage</h2>
      <FeaturedGames />
      <TopRatedGames /> 
      <GameList />
    </div>
  );
}

export default HomePage;
