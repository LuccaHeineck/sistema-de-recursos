// src/components/Header.js
import { useLocation } from "react-router-dom";
import AuthService from "../../AuthService";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const location = useLocation();
  const user = AuthService.getCurrentUser();

  return (
    <header className="bg-customGrey border-b-1 border-customGreyLight text-white p-4 h-16 flex items-center justify-between">
      <h1 className="text-xl font-bold">{location.pathname}</h1>
      <div className="flex items-center mr-4 ml-auto">
        <UserCircleIcon className="w-6 h-6 text-customYellow mr-2" />
        <span>{user ? user.username : "Desconectado"}</span>
      </div>
    </header>
  );
};

export default Header;
