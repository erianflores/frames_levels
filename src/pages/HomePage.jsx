import { FeaturedGames } from "../components/FeaturedGames";
import { TopRatedGames } from "../components/TopRatedGames";

function HomePage() {
  return (
    <div>
      <h2>Welcome to the Homepage</h2>
      <TopRatedGames />
      <FeaturedGames />
    </div>
  );
}

export default HomePage;
