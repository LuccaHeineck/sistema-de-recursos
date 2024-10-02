import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [message, setMessage] = useState(""); // Store username here

  console.log(message); // Debugging: Log the username to the console

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
              setMessage={setMessage} // Pass setMessage to LoginPage
            />
          }
        />

        <Route
          element={
            <ProtectedRoute
              element={
                <Layout username={message}>
                  {" "}
                  {/* Pass username to Layout */}
                  <Outlet />
                </Layout>
              }
            />
          }
        >
          <Route
            path="/bem"
            element={
              <div>
                <Home /> {/* You can also pass username here if needed */}
              </div>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/bem/cadastrar" element={<BemCreateForm />} />
      </Routes>
    </Router>
  );
};

export default App;
