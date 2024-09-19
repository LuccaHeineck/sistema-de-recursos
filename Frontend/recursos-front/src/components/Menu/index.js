import MenuButton from "./MenuButton";
import {
  InboxStackIcon,
  ComputerDesktopIcon,
  FolderPlusIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowsRightLeftIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  ArrowLeftStartOnRectangleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import DropdownButton from "./DropdownButton";

const Menu = () => {
  const optionsCadastro = {
    bem: { path: "/bem", icon: ComputerDesktopIcon, label: "Bem" },
    kit: { path: "/kit", icon: InboxStackIcon, label: "Kit" },
  };

  const optionsServicos = {
    retirada: {
      path: "/retiradas",
      icon: ArrowRightEndOnRectangleIcon,
      label: "Retirada",
    },
    devolucao: {
      path: "/devolucoes",
      icon: ArrowLeftEndOnRectangleIcon,
      label: "Devolução",
    },
  };

  const optionsMinhaAtividade = {
    minhas_retiradas: {
      path: "/minhasretiradas",
      icon: BriefcaseIcon,
      label: "Minhas Retiradas",
    },
    minhas_reservas: {
      path: "/minhasreservas",
      icon: CalendarDaysIcon,
      label: "Minhas Reservas",
    },
  };

  return (
    <div className="bg-black text-white p-4 h-screen w-72 fixed left-0 top-0 rounded-tr-xl rounded-br-xl overflow-y-auto no-scrollbar flex flex-col justify-between">
      <ul className="space-y-4">
        <DropdownButton
          label="Gerenciar"
          Icon={FolderPlusIcon}
          options={optionsCadastro}
        />

        <DropdownButton
          label="Serviços"
          Icon={ArrowsRightLeftIcon}
          options={optionsServicos}
        />

        <MenuButton to="/reserva" label="Reservas" Icon={CalendarIcon} />

        <MenuButton to="/multas" label="Multas" Icon={CurrencyDollarIcon} />

        <DropdownButton
          label="Minha Atividade"
          Icon={UserIcon}
          options={optionsMinhaAtividade}
        />
      </ul>

      <div className="pt-4 list-none">
        <MenuButton
          to="/logout"
          label="Logout"
          Icon={ArrowLeftStartOnRectangleIcon}
          corIcon="text-red-600 mr-1"
        />
      </div>
    </div>
  );
};

export default Menu;
