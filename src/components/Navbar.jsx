import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/login", // Backend login route
        formData
      );

      console.log("Login successful", data);

      // Token saved in localStorage
      localStorage.setItem("authToken", data.authToken);

      // Redirect to dashboard page
      nav("/dashboard");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      error.response?.data?.message || "Login failed. Try again.";
    }
  }

  return (
    <nav className="style-navbar">
      <h2
        className="navbar-title"
        onClick={() => nav(isLoggedIn ? "/dashboard" : "/")}
      >
        Frames & Levels
      </h2>
      {isLoggedIn ? (
        <div className="navbar-user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="navbar-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input"
          />
          <button type="submit" className="button-style">
            Login
          </button>
        </form>
      )}
    </nav>
  );
}

export default Navbar;
