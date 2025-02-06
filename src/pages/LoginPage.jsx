import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/login",
        formData
      );

      console.log("Login successful", data);

      localStorage.setItem("authToken", data.authToken);

      navigate("/");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Try again."
      );
    }
  }

  return (
    <div>
      <h2>Login Page</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
