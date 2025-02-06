import { BrowserRouter as Routes } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./styles/Featuredgames.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
