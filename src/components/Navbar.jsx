import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const {user, isLoggedIn, handleLogout, authenticateUser } =
    useContext(AuthContext);
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      authenticateUser();
    }
  }, [isLoggedIn, authenticateUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("Search Query:", e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    nav(`/search/${searchQuery}`);

    try {
      const { data } = await axios.get(
        `http://localhost:5005/api/games/search?query=${searchQuery}`
      );
      console.log("Search results:", data);
      setSearchResults(data);
    } catch (error) {
      console.log("Search error:", error);
    }

    {
      searchResults.length > 0 && (
        <ul>
          {searchResults.map((game) => (
            <li key={game._id}>{game.name}</li>
          ))}
        </ul>
      );
    }
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
      await authenticateUser();
   

      // Redirect to dashboard page
      nav("/dashboard");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      error.response?.data?.message || "Login failed. Try again.";
    }
  }

    //profile navigation
    const handleProfileClick = () => {
      if (user?._id) {
        nav(`/profile/${user._id}`);
      } else {
        nav("/login");
      }
    };


  return (
    <nav className="style-navbar">
      <div className="navbar-upper">
        <h2
          className="navbar-title"
          onClick={() => nav(isLoggedIn ? "/dashboard" : "/")}
        >
          Frames & Levels
        </h2>
        {isLoggedIn ? (
          <div className="navbar-user-info">
            <span>Welcome, {user?.username}</span>
            {/* Profile Button */}
            <button onClick={handleProfileClick} className="profile-btn">
              Profile
            </button>
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
            <button type="submit" className="login-button-style">
              Login
            </button>
          </form>
        )}
      </div>
      <div className="navbar-lower">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button-style">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
