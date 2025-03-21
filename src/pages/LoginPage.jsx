import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { API_URL } from "../config/config";
import { Spinner } from "../components/Spinner";
import Footer from "../components/Footer";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Login Data:", formData);

    setIsLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, formData);

      console.log("Login successful", data);

      localStorage.setItem("authToken", data.authToken);
      await authenticateUser();

      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <div className="login-page">
      <h2 className="login-title">Log back in?</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {isLoading ? (
        <Spinner /> 
      ) : (
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      )}
      <Footer />
    </div>
  );
}

export default LoginPage;
