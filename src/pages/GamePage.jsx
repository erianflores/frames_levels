import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  useEffect(() => {
    fetch(`http://localhost:5005/api/games/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
        setLoading(false);

        return fetch(`http://localhost:5005/api/reviews/one-game/${data._id}`);
      })
      .then((response) => response.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
        setError(error.message);
        setLoading(false);
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
    const newReview = {
      gameTitle: game.name,
      gameId: game._id,
      body: reviewText,
      rating: reviewRating,
    };

    try {
      console.log("Token being sent:", token);

      const response = await fetch("http://localhost:5005/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to submit review: ${responseData.message || response.status}`
        );
      }

      console.log("Review submitted successfully:", responseData);

      const updatedReviewsResponse = await fetch(
        `http://localhost:5005/api/reviews/one-game/${game._id}`
      );
      const updatedReviews = await updatedReviewsResponse.json();

      setReviews(Array.isArray(updatedReviews) ? updatedReviews : []);
      setReviewText("");
      setReviewRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) return <p>Loading game details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="game-page">
      <h1>{game.name}</h1>
      <img
        className="game-page-img"
        src={game.background_image}
        alt={game.name}
      />
      <p>{game.description ? game.description : "No description available."}</p>
      <p>
        <strong>Released:</strong>{" "}
        {game.released ? new Date(game.released).toDateString() : "TBA"}
      </p>
      <p>
        <strong>Metacritic Score:</strong> {game.metacritic || "N/A"}
      </p>
      <p>
        <strong>Playtime:</strong> {game.playtime || "Unknown"} hours
      </p>
      <p>
        <strong>Ratings Count:</strong> {game.ratings_count || 0}
      </p>
      <p>
        <strong>ESRB Rating:</strong> {game.esrb_rating?.name || "Not Rated"}
      </p>

      {game.platforms && game.platforms.length > 0 && (
        <p>
          <strong>Platforms:</strong>{" "}
          {game.platforms.map((p) => p.platform.name).join(", ")}
        </p>
      )}

      <h3>Leave a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          placeholder="Write your review here..."
        />

        <label>
          Rating:
          <select
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
          >
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.username || "Anonymous"}</strong>: {review.body} -
              <strong> ⭐ {review.rating}/5</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamePage;
