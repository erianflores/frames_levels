import { useContext } from "react";
import { GameContext } from "../contexts/game.context";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Sidebar() {
  const { setFilters } = useContext(GameContext);
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      console.log("Previous filters:", prevFilters);
      if (name === "genre") {
        const updatedGenres = checked
          ? [...(prevFilters.genres || []), value]
          : (prevFilters.genres || []).filter((g) => g !== value);

        return { ...prevFilters, genres: updatedGenres };
      }
      if (name === "platform") {
        const updatedPlatforms = checked
          ? [...(prevFilters.platform || []), value]
          : (prevFilters.platform || []).filter((g) => g !== value);

        return { ...prevFilters, platforms: updatedPlatforms };
      }

      return { ...prevFilters, [name]: value };
    });
  };

  return (
    <aside className="sidebar">
      <h2
        className="sidebar-home"
        onClick={() => nav(isLoggedIn ? "/dashboard" : "/")}
      >
        Home
      </h2>
      <h3>Filters</h3>

      <h4>Genres</h4>
      <div className="genre-filters">
        {[
          "Action",
          "RPG",
          "Shooter",
          "Adventure",
          "Indie",
          "Platformer",
          "Puzzle",
        ].map((genre) => (
          <label key={genre}>
            <input
              className="filter-input"
              type="checkbox"
              name="genre"
              value={genre}
              onChange={handleFilterChange}
            />
            {genre}
          </label>
        ))}
      </div>

      <h4>Platforms</h4>
      <div className="genre-filters">
        {[
          "PlayStation 5",
          "Xbox Series S/X",
          "PC",
          "Nintendo Switch",
          "PlayStation 4",
          "PlayStation 3",
          "Xbox 360",
          "Xbox One",
          "macOS",
          "Mobile",
        ].map((platform) => (
          <label key={platform}>
            <input
              className="filter-input"
              type="checkbox"
              name="platform"
              value={platform}
              onChange={handleFilterChange}
            />
            {platform}
          </label>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
