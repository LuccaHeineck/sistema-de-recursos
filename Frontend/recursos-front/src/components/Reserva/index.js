import React, { useState, useEffect } from "react";
import axios from "axios";
import ReservaTable from "./ReservaTable";
import Modal from "react-modal";
import ConfirmarButton from "../ConfirmarButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CSSTransition } from "react-transition-group";
import "./Reserva.css";

Modal.setAppElement("#root");
const Reserva = () => {
  const [data, setData] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);

  const handleDeleteConfirm = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/reservas/deletar/${selectedReserva.id_reserva}/`
      )
      .then(() => {
        closeConfirmationModal();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        fetchData(); // recarrega a lista atualizada
      })
      .catch((error) => {
        console.error("Erro ao deletar a reserva!", error);
      });
  };

  const openEditModal = (reserva) => {
    setSelectedReserva(reserva);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedReserva(null);
  };

  const openConfirmationModal = (reserva) => {
    setSelectedReserva(reserva);
    setConfirmationModalIsOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen(false);
    setSelectedReserva(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/reservas/listar/"
      );
      setData(response.data);
      console.log(response.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="p-4 min-h-screen">
      <CSSTransition
        in={showSuccess}
        timeout={300}
        classNames="success"
        unmountOnExit
      >
        <div className="fixed left-1/2 top-4 z-50 mb-4 p-4 bg-green-100 rounded-sm border-l-4 border-green-500 text-green-700">
          <p>Dados salvos com sucesso!</p>
        </div>
      </CSSTransition>

      <ReservaTable
        data={data.results}
        onEdit={openEditModal}
        onDelete={openConfirmationModal}
      ></ReservaTable>

      <ConfirmarButton
        isOpen={confirmationModalIsOpen}
        onRequestClose={closeConfirmationModal}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Deleção"
        message="Você tem certeza que deseja deletar esta reserva?"
      />
    </div>
  );
};

export default Reserva;
