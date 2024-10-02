import { Link } from "react-router-dom";
import ConfirmarButton from "../../ConfirmarButton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ action, to, label, Icon, corIcon }) => {
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const openConfirmationModal = () => {
    setConfirmationModalIsOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen(false);
  };

  const handleLogOut = () => {
    closeConfirmationModal();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <li>
      <Link
        onClick={openConfirmationModal}
        to={to}
        className="flex items-center space-x-2 p-3 text-lg rounded-lg hover:bg-customGrey text-customLightGrey"
      >
        {Icon && <Icon className={`ml-2 w-5 h-5 ${corIcon}`} />}
        <span className="pl-2">{label}</span>
      </Link>

      <ConfirmarButton
        isOpen={confirmationModalIsOpen}
        onRequestClose={closeConfirmationModal}
        onConfirm={handleLogOut}
        title="Confirmar Logout"
        message="Você tem certeza que deseja sair?"
      />
    </li>
  );
};

export default LogoutButton;
