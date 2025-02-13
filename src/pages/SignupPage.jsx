import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const userToCreate = {
      username: name,
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/signup",
        userToCreate
      );
      console.log("successful signup", data);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signup-page">
      
      <form className="signup-form" onSubmit={handleSignup}>
      <h3 className="signup-title">Signup Page</h3>
        <label className="input-label">Username:</label>
        <input
          className="input-field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="input-label">Email:</label>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="input-label">Password:</label>
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup-button" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
