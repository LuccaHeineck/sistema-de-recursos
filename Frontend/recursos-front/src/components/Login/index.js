import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../AuthService"; // Import AuthService

const Login = ({ setUser }) => {
  // setUser is handleSetUser passed from App.js
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      const token = response.access; // Access token from response
      const user = { username }; // Assuming you want to store the username, adjust as needed

      setUser(token, user); // Use handleSetUser to store token and user globally and in localStorage
      setMessage("Login successful!");
      navigate("/bem"); // Redirect to /bem after successful login
    } catch (error) {
      setMessage("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-customGrey">
      {" "}
      {/* Full screen height and background color */}
      <div className="w-1/2 md:w-1/3 lg:w-1/4">
        {" "}
        {/* Responsive width */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center bg-customGreyLight p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full p-3 bg-customBlue text-white font-semibold rounded-lg hover:bg-customDarkBlue transition duration-200"
          >
            Login
          </button>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
