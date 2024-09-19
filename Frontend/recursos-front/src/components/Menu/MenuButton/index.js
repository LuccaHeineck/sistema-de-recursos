import { Link } from "react-router-dom";

const MenuButton = ({ to, label, Icon, corIcon }) => {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center space-x-2 p-3 text-lg rounded-lg hover:bg-customGrey text-customLightGrey"
      >
        {Icon && <Icon className={`ml-2 w-5 h-5 ${corIcon}`} />}
        <span className="pl-2">{label}</span>
      </Link>
    </li>
  );
};

export default MenuButton;
