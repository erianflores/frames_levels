import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css"; 
import womanImage from "../assets/woman.png";
import manImage from "../assets/man.png";
import catImage from "../assets/catgamer.png";
import girlImage from "../assets/girl.png";
import coolImage from "../assets/cool.png";
import kidImage from "../assets/kid.png";
import { AuthContext } from "../contexts/auth.context";

const ProfilePage = () => {
  const { userId: userIdFromURL } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: "", email: "", profilePic: "" });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", profilePic: "" });
  const { setUser: setContextUser } = useContext(AuthContext);
  
  const profilePictures = [womanImage, manImage, kidImage, catImage, coolImage, girlImage ];

  const fetchUserData = async () => {
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
        const reviewResponse = await fetch(`http://localhost:5005/users/profile/${finalUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);

        const verifyResponse = await fetch("http://localhost:5005/users/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (verifyResponse.ok) {
          const userData = await verifyResponse.json();
          setUser({
            username: userData.currentUser.username,
            email: userData.currentUser.email,
            profilePic: userData.currentUser.profilePic || profilePictures[0],
          });

          setFormData({
            username: userData.currentUser.username || "",
            email: userData.currentUser.email || "",
            password: "",
            profilePic: userData.currentUser.profilePic || profilePictures[0],
          });
        }
      }
    } catch (error) {
      setError("Error decoding token");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userIdFromURL, editing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
  const handleProfilePicSelect = (pic) => {
    setFormData({ ...formData, profilePic: pic });
    console.log("selected profile picture", pic);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Form submitted for update!");
    
    const token = localStorage.getItem("authToken");

    const updatedData = {};
    if (formData.username !== user.username) updatedData.username = formData.username;
    if (formData.email !== user.email && formData.email.trim() !== "") updatedData.email = formData.email;
    if (formData.password.trim() !== "") updatedData.password = formData.password;
    if (formData.profilePic !== user.profilePic) updatedData.profilePic = formData.profilePic;

    console.log("Sending update request with:", updatedData);

    try {
      const response = await fetch("http://localhost:5005/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        setUser({ 
          username: data.user.username, 
          email: data.user.email, 
          profilePic: data.user.profilePic 
       });

       setContextUser({ 
        username: data.user.username, 
        email: data.user.email, 
        profilePic: data.user.profilePic 
     });

       setFormData({
          username: data.user.username,
          email: data.user.email,
          password: "",
          profilePic: data.user.profilePic,
       });

        setEditing(false);

       await fetchUserData();  
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
      <div className="profile-box">
      <h1 className="profile-header">Hi, {user.username}!</h1>
      {editing ? (
        <form className="profile-form" onSubmit={handleUpdate}>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Leave blank to keep current email" />

          <label>New Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current password" />

          <label>Profile Picture:</label>
          <div className="profile-pic-options">
            {profilePictures.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`Profile option ${index + 1}`}
                className={`profile-pic-option ${formData.profilePic === pic ? "selected" : ""}`}
                onClick={() => handleProfilePicSelect(pic)}
              />
              
            ))}
          </div>
          

          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" onClick={() => setEditing(false)} className="cancel-button">Cancel</button>
        </form>
      ) : (
        <div className="profile-info">
          <div className="profile-picture-container">
            <img src={user.profilePic} alt="Profile" className="profile-picture" />
          </div>

          <button onClick={() => setEditing(true)} className="edit-button">Edit Profile</button>
          <button onClick={handleDelete} className="delete-button">Delete Account</button>
        </div>
      )}
      </div>

      <h2 className="title-review-box">{user.username}'s reviews</h2>
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
