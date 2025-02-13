import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Example of hardcoded game data
const hardcodedGames = [
  {
    _id: "679e37bb4738965adff0d5db",
    name: "The Witcher 3: Wild Hunt",
    background_image:
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    rating: 4.65,
  },
  {
    _id: "679e37bb4738965adff0d6e2",
    name: "Rise of the Tomb Raider",
    background_image:
      "https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg",
    rating: 4.04,
  },
  {
    _id: "679e37bb4738965adff0d676",
    name: "God of War (2018)",
    background_image:
      "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    rating: 4.56,
  },
  {
    _id: "679e37bb4738965adff0d69a",
    name: "Cyberpunk 2077",
    background_image:
      "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    rating: 4.2,
  },
  {
    _id: "679e37bb4738965adff0d6ba",
    name: "Warframe",
    background_image:
      "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg",
    rating: 3.42,
  }
];

export const FeaturedGames = () => {
  const games = hardcodedGames; 

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
    arrows: true,
  };

  return (
    <section id="featured-games">
      <h2>Featured Games</h2>
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game._id} className="game-item">
            <Link to={`/games/${game._id}`}>
              <img
                src={game.background_image || "https://via.placeholder.com/200"}
                alt={game.name}
              />
              <h3>{game.name}</h3>
            </Link>
            <p>⭐ Rating: {game.rating} / 5</p>
            <p>{game.description}</p> 
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedGames;
