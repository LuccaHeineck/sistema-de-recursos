import React, { useState, useEffect } from "react";
import Table from "../Table";
import axios from "axios";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
import "./TipoBem.css"; // Import your CSS file for animations
import ConfirmarButton from "../ConfirmarButton";
import { Link } from "react-router-dom";
import TipoBemTable from "./TipoBemTable";

Modal.setAppElement("#root");

const TipoBem = () => {
  const [data, setData] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedTipoBem, setSelectedTipoBem] = useState(null);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [tiposBem, setTiposBem] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bem/tipo_bem/listar/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching tipos de bem!", error);
      });
  }, []);

  const openEditModal = (bem) => {
    setSelectedTipoBem(bem);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedTipoBem(null);
  };

  const openConfirmationModal = (bem) => {
    setSelectedTipoBem(bem);
    setConfirmationModalIsOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen(false);
    setSelectedTipoBem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTipoBem({ ...selectedTipoBem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://127.0.0.1:8000/bem/tipo_bem/atualizar/${selectedTipoBem.id_tipo_bem}/`,
        selectedTipoBem
      )
      .then((response) => {
        setData(
          data.map((tipobem) =>
            tipobem.id_tipo_bem === selectedTipoBem.id_tipo_bem
              ? response.data
              : tipobem
          )
        );

        closeEditModal();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o tipo de bem!", error);
      });
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/bem/tipo_bem/deletar/${selectedTipoBem.id_tipo_bem}/`
      )
      .then(() => {
        setData(
          data.filter(
            (tipobem) => tipobem.id_tipo_bem !== selectedTipoBem.id_tipo_bem
          )
        );
        closeConfirmationModal();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao deletar o tipo bem!", error);
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
        <h1 className="text-2xl font-semibold mb-4">Lista de Tipos Bens</h1>
        <Link
          to="/tipobem/inserir"
          className="relative mb-6 border border-customYellow flex items-center justify-center p-2 px-7 text-lg rounded-md bg-transparent text-customYellow overflow-hidden transition duration-300 group"
        >
          <span className="absolute inset-0 bg-customYellow rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-150 group-hover:origin-bottom"></span>
          <span className="relative transition duration-300 group-hover:text-customGrey">
            Criar novo
          </span>
        </Link>
      </div>

      <TipoBemTable
        data={data}
        onEdit={openEditModal}
        onDelete={openConfirmationModal}
      />
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Editar Tipo Bem"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-xs"
      >
        {selectedTipoBem && (
          <div
            className="bg-customGrey border border-customGreyLight text-white p-8 rounded-lg mx-auto font-poppins"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <h2 className="text-2xl font-semibold mb-7">Editar Tipo Bem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Tipo do bem</label>
                <input
                  type="text"
                  name="tipo_bem"
                  value={selectedTipoBem.tipo_bem}
                  onChange={handleInputChange}
                  className="bg-customGrey mb-10 text-white mt-1 block w-full p-2 border border-customLightGrey rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Digite o tipo do bem"
                />
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="inline-flex items-center px-6 py-2 border text-sm font-medium rounded-md shadow-sm text-white bg-customGrey hover:bg-customGreyLight border-customBlue"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customBlue hover:bg-blue-900"
                >
                  Salvar
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

export default TipoBem;
