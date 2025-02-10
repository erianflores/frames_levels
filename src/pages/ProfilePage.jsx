import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId: userIdFromURL } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [userIdFromToken, setUserIdFromToken] = useState(null);
  

  useEffect(() => {
    
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
     setUserIdFromToken(decodedToken._id);
    } catch (error) {
      setError("Error decoding token");              // Handle error in token decoding
      return;
    }

    const finalUserId = userIdFromURL || userIdFromToken;
    console.log("finalUserId:", finalUserId);

    if (finalUserId) {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5005/users/profile/${finalUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched reviews data:", data);
          setReviews(data); 
        } else {
          setError("Failed to load user reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Error fetching reviews");
      }
    };

    fetchReviews(); 
    }

  }, [userIdFromURL, userIdFromToken]);

  if (error) {
    return <p>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div>
      <h1>User Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>{review.gameTitle}</p>
            <p>{review.body}</p>
            <p>Rating: ⭐ {review.rating} / 5</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
