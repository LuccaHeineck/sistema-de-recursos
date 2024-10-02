// src/components/Header.js
import { useLocation } from "react-router-dom";
import AuthService from "../../AuthService"; // Import AuthService

const Header = () => {
  // Desestruture as props aqui
  const location = useLocation();

  const user = AuthService.getCurrentUser();

  return (
    <header className="bg-customGrey border-b-1 border-customGreyLight text-white p-4 h-16 flex items-center justify-between">
      <h1 className="text-xl font-bold">{location.pathname}</h1>
      <label className="mr-4 ml-auto">
        {user ? user.username : "Desconectado"}
      </label>{" "}
      {/* Exibe o nome do usuário ou 'Carregando...' */}
    </header>
  );
};

export default Header;
