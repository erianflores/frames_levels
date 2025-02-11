import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./styles/Featuredgames.css";
import Sidebar from "./components/Sidebar";
import { GameProvider } from "./contexts/game.context";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <GameProvider>
        <Navbar />
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </GameProvider>
    </div>
  );
}

export default App;
