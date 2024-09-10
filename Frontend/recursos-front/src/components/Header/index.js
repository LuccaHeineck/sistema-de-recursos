import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-customGrey border-b-1 border-slate-400 text-white p-4 h-16">
      <h1 className="text-xl font-bold">{location.pathname}</h1>
    </header>
  );
};

export default Header;
