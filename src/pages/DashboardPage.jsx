import { FeaturedGames } from "../components/FeaturedGames";
import { TopRatedGames } from "../components/TopRatedGames";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    nav("/"); // Redirect to public homepage
  };
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <TopRatedGames />
      <FeaturedGames />
    </div>
  );
}

export default Dashboard;
