import React, { useState, useEffect } from "react";
import Table from "../Table";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedBem, setSelectedBem] = useState(null); // Bem selecionado para editar
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado do modal

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bem/listar/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Função para abrir o modal de edição
  const openModal = (bem) => {
    setSelectedBem(bem);
    setModalIsOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBem(null);
  };

  // Função para lidar com as mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBem({ ...selectedBem, [name]: value });
  };

  // Função para enviar os dados atualizados
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

        closeModal(); // Fechar o modal após a edição
      })
      .catch((error) => {
        console.error("Erro ao atualizar o bem!", error);
      });
  };

  return (
    <div className="p-4  min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Lista de Bens</h1>
      <Table data={data} onEdit={openModal} />{" "}
      {/* Passa a função de editar para a tabela */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Bem"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedBem && (
          <div className="bg-gray-800 text-white p-8 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Editar Bem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Descrição:</label>
                <input
                  type="text"
                  name="descricao"
                  value={selectedBem.descricao}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status:</label>
                <select
                  name="status_bem"
                  value={selectedBem.status_bem}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="D">Disponível</option>
                  <option value="R">Retirado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Permite reserva?
                </label>
                <select
                  name="permite_reserva"
                  value={selectedBem.permite_reserva}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
