import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import AuthService from "../../AuthService"; // Import AuthService

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.register(username, email, password); // Use AuthService to register
      setMessage("Registration successful! You can now log in.");
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      setMessage("Registration failed! Please check your inputs.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-customGrey">
      <div className="w-1/2 md:w-1/3 lg:w-1/5">
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center bg-customGreyLight p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Register</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 text-white bg-customGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 text-white bg-customGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 text-white bg-customGrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            style={{ width: "90%" }}
            className="w-full p-3 mt-5 bg-customBlue text-white font-semibold rounded-lg hover:bg-customDarkBlue transition duration-200"
          >
            Register
          </button>

          {message && <p className="mt-4 text-red-500">{message}</p>}

          {/* Redirect to Login Link */}
          <p className="mt-4 text-white text-center">
            Já possui uma conta? <br />
            <Link to="/login" className="text-customYellow hover:underline">
              Login aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
