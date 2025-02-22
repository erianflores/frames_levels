import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Example of hardcoded game data
const hardcodedGames = [
  {
    _id: "67b4ac2d31ccde86c71e56d3",
    name: "The Witcher 3: Wild Hunt",
    background_image:
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    rating: 4.65,
  },
  {
    _id: "67b4ac2d31ccde86c71e5a80",
    name: "Uncharted 4: A Thief’s End",
    background_image:
      "https://media.rawg.io/media/games/709/709bf81f874ce5d25d625b37b014cb63.jpg",
    rating: 4.49,
  },
  {
    _id: "67b4ad6d7834b4a51a464ba8",
    name: "Marvel Rivals",
    background_image:
      "https://media.rawg.io/media/screenshots/3f0/3f0fdfc7c71655366aa83ab80ecab9b8.jpg",
    rating: 4.59,
  },
  {
    _id: "67b4ac2d31ccde86c71e5726",
    name: "Red Dead Redemption 2",
    background_image:
      "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    rating: 3.85,
  },
  {
    _id: "67b4ac2d31ccde86c71e5816",
    name: "Rise of the Tomb Raider",
    background_image:
      "https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg",
    rating: 4.04,
  },
  {
    _id: "67b4ac2d31ccde86c71e578c",
    name: "God of War (2018)",
    background_image:
      "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    rating: 4.56,
  },
  {
    _id: "67b4ac2d31ccde86c71e57ba",
    name: "Cyberpunk 2077",
    background_image:
      "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    rating: 4.2,
  },
  {
    _id: "67b4ac2d31ccde86c71e57e2",
    name: "Warframe",
    background_image:
      "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg",
    rating: 3.42,
  },
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
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <section id="featured-games">
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game._id} className="game-item">
            {/* <h2>You will love:</h2> */}
            <Link to={`/games/${game._id}`} className="game-link">
              <div className="image-wrapper">
                <img
                  src={
                    game.background_image || "https://via.placeholder.com/200"
                  }
                  alt={game.name}
                />
                <div className="overlay">
                  <h3>{game.name}</h3>
                  <p>⭐ Rating: {game.rating} / 5</p>
                </div>
              </div>
            </Link>
            <p>{game.description}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedGames;
