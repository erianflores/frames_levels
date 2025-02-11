import { useContext } from "react";
import { GameContext } from "../contexts/game.context";

function Sidebar() {
  const { setFilters } = useContext(GameContext);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <aside className="sidebar">
      <h3>Filters</h3>
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        onChange={handleFilterChange}
      />
      <select name="genre" onChange={handleFilterChange}>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="RPG">RPG</option>
        <option value="Shooter">Shooter</option>
      </select>
    </aside>
  );
}

export default Sidebar;
