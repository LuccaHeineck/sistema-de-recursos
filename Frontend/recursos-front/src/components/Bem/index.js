import React, { useState, useEffect } from "react";
import Table from "../Table";
import axios from "axios";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
import "./Bem.css"; // Import your CSS file for animations
import ConfirmarButton from "../ConfirmarButton";
import BemCreateForm from "./BemCreateForm";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const Bem = () => {
  const [data, setData] = useState([]);
  const [selectedBem, setSelectedBem] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [tiposBem, setTiposBem] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bem/listar/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
    axios
      .get("http://127.0.0.1:8000/bem/tipo_bem/listar/")
      .then((response) => {
        setTiposBem(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching tipos de bem!", error);
      });
  }, []);

  const openEditModal = (bem) => {
    setSelectedBem(bem);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedBem(null);
  };

  const openConfirmationModal = (bem) => {
    setSelectedBem(bem);
    setConfirmationModalIsOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen(false);
    setSelectedBem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBem({ ...selectedBem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://127.0.0.1:8000/bem/update/${selectedBem.id_bem}/`,
        selectedBem
      )
      .then((response) => {
        setData(
          data.map((bem) =>
            bem.id_bem === selectedBem.id_bem ? response.data : bem
          )
        );

        closeEditModal();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o bem!", error);
      });
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://127.0.0.1:8000/bem/delete/${selectedBem.id_bem}/`)
      .then(() => {
        setData(data.filter((bem) => bem.id_bem !== selectedBem.id_bem));
        closeConfirmationModal();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao deletar o bem!", error);
      });
  };

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

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Lista de Bens</h1>
        <Link
          to="/bem/inserir"
          className="mb-6 border border-customYellow flex items-center space-x-2 p-3 px-7 text-lg rounded-lg hover:bg-customGreyLight text-customYellow"
        >
          <span className="pl-2">Criar novo</span>
        </Link>
      </div>

      <Table
        data={data}
        onEdit={openEditModal}
        onDelete={openConfirmationModal}
      />
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Editar Bem"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-xs"
      >
        {selectedBem && (
          <div
            className="bg-customGrey border border-customGreyLight text-white p-8 rounded-lg mx-auto font-poppins"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <h2 className="text-2xl font-semibold mb-7">Editar Bem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Descrição:</label>
                <input
                  type="text"
                  name="descricao"
                  value={selectedBem.descricao}
                  onChange={handleInputChange}
                  className="bg-customGrey text-white mt-1 block w-full p-2 border border-customLightGrey rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Tipo do bem</label>
                <select
                  name="id_tipo_bem"
                  value={selectedBem.id_tipo_bem}
                  onChange={handleInputChange}
                  className="bg-customGrey text-white mt-1 block w-full p-2 border border-customLightGrey rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Selecione um tipo
                  </option>
                  {tiposBem.map((tipo) => (
                    <option key={tipo.id_tipo_bem} value={tipo.id_tipo_bem}>
                      {tipo.tipo_bem}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Status:</label>
                  <select
                    name="status_bem"
                    value={selectedBem.status_bem}
                    onChange={handleInputChange}
                    className="bg-customGrey text-white mt-1 block w-full p-2 border border-customLightGrey rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="D">Disponível</option>
                    <option value="R">Retirado</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium">
                    Permite reserva?
                  </label>
                  <select
                    name="permite_reserva"
                    value={selectedBem.permite_reserva}
                    onChange={handleInputChange}
                    className="bg-customGrey text-white mb-5 mt-1 block w-full p-2 border border-customLightGrey rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customBlue hover:bg-blue-900"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="inline-flex items-center px-6 py-2 border text-sm font-medium rounded-md shadow-sm text-white bg-customGrey hover:bg-customGreyLight border-customBlue"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>

      <ConfirmarButton
        isOpen={confirmationModalIsOpen}
        onRequestClose={closeConfirmationModal}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Deleção"
        message="Você tem certeza que deseja deletar este bem?"
      />
    </div>
  );
};

export default Bem;