// src/components/LoginPage.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setMessage, setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recursos/login/",
        {
          username,
          password,
        },
        { withCredentials: true }
      ); // Envia cookies de sessão

      setIsAuthenticated(true); // Define o estado de autenticação para true
      localStorage.setItem("accessToken", "some-token"); // Simular token (opcional)
      setError("");
      setMessage(response.data.message);
      navigate("/bem");
    } catch (error) {
      // Verifica se error.response existe antes de acessar data
      setError(
        error.response && error.response.data.error
          ? error.response.data.error
          : "Erro ao fazer login"
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
