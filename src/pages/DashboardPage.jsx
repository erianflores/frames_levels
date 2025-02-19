import { FeaturedGames } from "../components/FeaturedGames";
import GameList from "../components/GameList";
import { TopRatedGames } from "../components/TopRatedGames";
//import { useNavigate } from "react-router-dom";

function Dashboard() {
  //took the logout button out for now since its in the navbar :)
  //const nav = useNavigate();

  // const handleLogout = () => {
  //  localStorage.removeItem("authToken"); // Remove token
  //  nav("/"); // Redirect to public homepage
  //};
  return (
    <div className="home-page">
      {/*<button onClick={handleLogout}>Logout</button>*/}

      <FeaturedGames />
      <TopRatedGames />
      <GameList />
    </div>
  );
}

export default Dashboard;
