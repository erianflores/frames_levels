import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
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
      console.log("successful signup up", data);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3>Signup Page</h3>
      <form onSubmit={handleSignup}>
        <label>Username:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
