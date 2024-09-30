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

  // Protected Route to check authentication
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Rota para login sem layout */}
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Rota com Layout para várias páginas */}
        <Route
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Outlet />{" "}
                  {/* Outlet permite que as rotas "filhas" sejam renderizadas aqui */}
                </Layout>
              }
            />
          }
        >
          {/* Rotas protegidas dentro do Layout */}
          <Route path="/bem" element={<Home />} />
        </Route>

        {/* Redireciona para login se o caminho não for conhecido */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
