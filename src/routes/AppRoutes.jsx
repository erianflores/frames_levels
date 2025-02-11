import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import GamePage from "../pages/GamePage";
import Dashboard from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import SearchResults from "../pages/SearchResults";
// import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/games/:id" element={<GamePage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
