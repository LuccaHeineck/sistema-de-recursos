import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-customGrey border-b-1 border-customGreyLight text-white p-4 h-16 flex items-center justify-between">
      <h1 className="text-xl font-bold">{location.pathname}</h1>
      <label className="mr-4 ml-auto">Nome Usuário Logado</label>
    </header>
  );
};

export default Header;
