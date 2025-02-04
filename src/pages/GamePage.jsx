import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GamePage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
     fetch(`http://localhost:5005/api/games/${id}`)
     .then(response => response.json())
     .then(data => {
        setGame(data);  
        setLoading(false);
     })
     .catch(error => {
        console.error("Error fetching game details:", error);
        setError(error.message);
        setLoading(false);
     });

     fetch(`http://localhost:5005/api/reviews/game/${id}`)
     .then(response => response.json())
     .then(data => {
         setReviews(Array.isArray(data) ? data : []);
     })
     .catch(error => {
         console.error("Error fetching reviews:", error);
         setReviews([]); 
     });
}, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        console.log("Token being sent:", token);
        

        if (!token) {
            alert("You need to log in to submit a review.");
            return;
        }
        const newReview = { gameTitle: game.name, gameId: id, body: reviewText, rating: 5 };

        try {
            console.log("Token being sent:", token);

            const response = await fetch("http://localhost:5005/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                           "Authorization": `Bearer ${token}`,
                 },
                body: JSON.stringify(newReview),
            });

            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error(`Failed to submit review: ${responseData.message || response.status}`);
            }
            
            console.log("Review submitted successfully:", responseData);

            const updatedReviewsResponse = await fetch(`http://localhost:5005/api/reviews/game/${id}`);
            const updatedReviews = await updatedReviewsResponse.json();

            setReviews(Array.isArray(updatedReviews) ? updatedReviews : []);
            setReviewText("");
        

    } catch (error) {
        console.error("Error submitting review:", error);
    }
  };

    if (loading) return <p>Loading game details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name} />
            <p>{game.description ? game.description : "No description available."}</p>

            <h2>Reviews</h2>
            {reviews.length === 0 ? <p>No reviews yet. Be the first to review!</p> : (
    <ul>
        {reviews.map((review, index) => (
            <li key={index}>{review.body}</li>
        ))}
    </ul>
)}

            <h3>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
                <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GamePage;