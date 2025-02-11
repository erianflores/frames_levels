import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css"; 

const ProfilePage = () => {
  const { userId: userIdFromURL } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userIdFromToken = decodedToken._id;
      const finalUserId = userIdFromURL || userIdFromToken;

      if (finalUserId) {
        fetch(`http://localhost:5005/users/profile/${finalUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => setReviews(data))
          .catch((error) => {
            console.error("Error fetching reviews:", error);
            setError("Error fetching reviews");
          });

        fetch("http://localhost:5005/users/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser({ username: data.currentUser.username, email: data.currentUser.email });
            setFormData({ username: data.currentUser.username, email: data.currentUser.email, password: "" });
          })
          .catch((error) => console.error("Error verifying user:", error));
      }
    } catch (error) {
      setError("Error decoding token");
    }
  }, [userIdFromURL]);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5005/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        setUser({ username: data.user.username, email: data.user.email });
        setEditing(false);
        fetchUserData();  
      } else {
        alert(data.message || "Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

 
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");

    if (confirmDelete) {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch("http://localhost:5005/users/delete", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.removeItem("authToken");
          navigate("/signup");
        } else {
          alert("Error deleting account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-header">User Profile</h1>

      {editing ? (
        <form className="profile-form" onSubmit={handleUpdate}>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>New Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current password" />

          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" onClick={() => setEditing(false)} className="cancel-button">Cancel</button>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Username:</strong> {user.username}</p>

          <button onClick={() => setEditing(true)} className="edit-button">Edit Profile</button>
          <button onClick={handleDelete} className="delete-button">Delete Account</button>
        </div>
      )}

      <h2>User Reviews</h2>
      <div className="reviews-container">
        {Array.isArray(reviews) && reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          Array.isArray(reviews) &&
          reviews.map((review) => (
            <div key={review._id} className="review-box">
              <p className="review-title">{review.gameTitle}</p>
              <p className="review-body">{review.body}</p>
              <p className="review-rating">⭐ {review.rating} / 5</p>
            </div>
          ))
        )}
    </div>
    </div>
  );
};

export default ProfilePage;
