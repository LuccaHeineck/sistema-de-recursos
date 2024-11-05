import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout"; // Assuming Layout is in components folder
import Bem from "./components/Bem"; // Assuming Bem is in components folder
import TipoBem from "./components/TipoBem"; // Assuming Bem is in components folder
import BemCreateForm from "./components/Bem/BemCreateForm";
import Register from "./components/Register";
import TipoBemCreateForm from "./components/TipoBem/TipoBemCreateForm";
import Retirada from "./components/Retirada";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Function to set user and token after login
  const handleSetUser = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  useEffect(() => {
    // Check localStorage for token and user when the component mounts
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={handleSetUser} />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            path="/bem"
            element={
              token && user ? (
                <div>
                  <Bem />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="bem/inserir"
            element={
              token && user ? (
                <div>
                  <BemCreateForm />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/tipobem"
            element={
              token && user ? (
                <div>
                  <TipoBem />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/tipobem/inserir"
            element={
              token && user ? (
                <div>
                  <TipoBemCreateForm />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/retirada"
            element={
              token && user ? (
                <div>
                  <Retirada />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
        {/* Redirect to login for any unknown paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
