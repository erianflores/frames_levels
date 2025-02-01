//  import React, { useState, useEffect } from 'react';
//  import Slider from 'react-slick';
//  import 'slick-carousel/slick/slick.css'; 
//  import 'slick-carousel/slick/slick-theme.css'; 


// export const FeaturedGames = () => {
//     const [games, setGames] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch('http://localhost:5000/api/games/featured')
//         // Placeholder data 
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch games');
//             }
//             return response.json();
//         })
//         .then(data)
//       //stopped here
//     }, []);

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//     };
//   return (
//     <section id="featured-games">
//        <h2>Featured Games</h2>
//        <Slider {...settings}>
//         {games.map(game => (
//             <div key={game.id} className="game-item">
//                 <img src={game.coverImage} alt={game.title} />
//                 <h3>{game.title}</h3>
//             </div>
//         ))}
//        </Slider>
//     </section>
    
//   );
// }

// export default FeaturedGames;