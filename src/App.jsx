import { BrowserRouter as Router } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
//import "./styles/Featuredgames.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;
