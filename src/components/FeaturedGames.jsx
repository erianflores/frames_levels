 import React, { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import Slider from 'react-slick';
 import 'slick-carousel/slick/slick.css'; 
 import 'slick-carousel/slick/slick-theme.css'; 


export const FeaturedGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5005/api/games/featured')
        
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setGames(data);
            setLoading(false);
        })
      .catch(error => {
        console.error("Error fetching games:", error);
        setError(error.message);
        setLoading(false);
      })
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    if (loading) return <p>Loading featured games...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <section id="featured-games">
       <h2>Featured Games</h2>
       <Slider {...settings}>
        {games.map(game => (
            <div key={game.id} className="game-item">
              <Link to={`/games/${game.id}`}>
                <img 
                src={game.background_image || "https://via.placeholder.com/200"} 
                alt={game.name} 
                />
                <h3>{game.name}</h3>
                </Link>
            </div>
        ))}
       </Slider>
    </section>
    
  );
}

export default FeaturedGames;