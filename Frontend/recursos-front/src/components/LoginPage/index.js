import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      // Assuming your API returns the access token
      const accessToken = response.data.access;
      localStorage.setItem("accessToken", accessToken);

      // Set authentication state to true
      setIsAuthenticated(true);

      // Optionally, redirect to a protected route after successful login
      window.location.href = "/bem"; // Redirect to the home page or dashboard
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
