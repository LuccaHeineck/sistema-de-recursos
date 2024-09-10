import MenuButton from "./MenuButton";
import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import DropdownButton from "./DropdownButton";

const Menu = () => {
  const options = {
    "Opção 1": { path: "/home", icon: HomeIcon },
    "Opção 2": { path: "/home", icon: UserIcon },
    "Opção 3": { path: "/home", icon: UserIcon },
  };

  return (
    <div className="bg-black text-white p-4 h-screen w-64 fixed left-0 top-0 rounded-tr-xl rounded-br-xl">
      <ul className="space-y-4">
        <MenuButton to="/" label="Home" Icon={HomeIcon} />
        <MenuButton to="/about" label="About" Icon={InformationCircleIcon} />
        <MenuButton to="/contact" label="Contact" Icon={UserIcon} />
        <DropdownButton
          label="Menu"
          Icon={InformationCircleIcon}
          options={options}
        />
        <MenuButton to="/contact" label="Contact" Icon={UserIcon} />
      </ul>
    </div>
  );
};

export default Menu;
