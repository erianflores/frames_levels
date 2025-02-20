import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/auth.context";
import { API_URL } from "../config/config";
import { Spinner } from "../components/Spinner";
import Footer from "../components/Footer";

const GamePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [owned, setOwned] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/games/one-game/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
        setLoading(false);

        return fetch(`${API_URL}/api/reviews/one-game/${data._id}`);
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

  const handleAddToOwned = async (gameId) => {
    console.log("Current user:", user);
    if (!user || !user._id) {
      console.error("Invalid user:", user);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/${user._id}/owned`, {
        gameId,
      });
      console.log("Game added to owned list:", response.data);
      setOwned(true);
    } catch (error) {
      console.error("Error adding to owned list", error);
    }
  };

  const handleAddToWishlist = async (gameId) => {
    console.log("Current user:", user);
    if (!user || !user._id) {
      console.error("Invalid user:", user);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/users/${user._id}/wishlist`,
        { gameId }
      );
      console.log("Game added to wishlist:", response.data);
      setWishlist(true);
    } catch (error) {
      console.error("Error adding to owned list", error);
    }
  };

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

      const response = await fetch(`${API_URL}/api/reviews`, {
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
        `${API_URL}/api/reviews/one-game/${game._id}`
      );
      const updatedReviews = await updatedReviewsResponse.json();

      setReviews(Array.isArray(updatedReviews) ? updatedReviews : []);
      setReviewText("");
      setReviewRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="game-page">
      <h1>{game.name}</h1>
      <div className="game-page-content">
        <img
          className="game-page-img"
          src={game.background_image}
          alt={game.name}
        />
        <div className="game-info">
          <p>
            {game.description ? game.description : "No description available."}
          </p>

          <div className="game-favorites">
            <button onClick={() => handleAddToOwned(game._id)} disabled={owned}>
              {owned ? "Owned" : "I Have This"}
            </button>
            <button
              onClick={() => handleAddToWishlist(game._id)}
              disabled={wishlist}
            >
              {wishlist ? "Wishlisted" : "I Want This"}
            </button>
          </div>
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
            <strong>ESRB Rating:</strong>{" "}
            {game.esrb_rating?.name || "Not Rated"}
          </p>

          {game.platforms && game.platforms.length > 0 && (
            <p>
              <strong>Platforms:</strong>{" "}
              {game.platforms.map((p) => p.platform.name).join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <h3>Leave a Review</h3>
        <form className="review-form" onSubmit={handleReviewSubmit}>
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
          <ul className="review-list">
            {reviews.map((review, index) => (
              <li className="review-item" key={index}>
                <strong>{review.username || "Anonymous"}</strong>
                <p>{review.body}</p>
                <p>
                  <strong>⭐ {review.rating}/5</strong>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;
