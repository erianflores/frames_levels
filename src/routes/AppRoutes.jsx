import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
 import GamePage from "../pages/GamePage";
// import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/games/:id" element={<GamePage />} />
      {/*<Route path="/profile" element={<ProfilePage />} /> */}
    </Routes>
  );
}

export default AppRoutes;
