import React, { useState } from "react";
import BemLookup from "./BemLookup";
import UserLookup from "./UserLookup";
import ItensRetiradaModal from "./RetiradaTableItems";

const Retirada = () => {
  const [showNextPart, setShowNextPart] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBems, setSelectedBems] = useState([]);
  const [observations, setObservations] = useState({});
  const [quantidadeBem, setQuantidadeBem] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRetirada, setSelectedRetirada] = useState(null);

  const moment = require("moment");
  const today = moment();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBemSelect = (selectedBem) => {
    setSelectedBems((prevSelectedBems) => [...prevSelectedBems, selectedBem]);
  };

  const handleNextClick = () => {
    setShowNextPart(true);
  };

  const handleFinishClick = async () => {
    const retirada = {
      data_retirada: today.format("YYYY-MM-DD HH:mm:ss"),
      status_retirada: "Em andamento",
      motivo_retirada: "",
      id_pessoa: selectedUser.id,
    };

    setSelectedRetirada(retirada);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRetirada(null);
  };

  const removeBem = (bemId) => {
    setSelectedBems((prevSelectedBems) =>
      prevSelectedBems.filter((bem) => bem.id_bem !== bemId)
    );
    // Remover também a observação associada a este bem
    setObservations((prevObservations) => {
      const updatedObservations = { ...prevObservations };
      delete updatedObservations[bemId];
      return updatedObservations;
    });
  };

  const handleObservationChange = (bemId, value) => {
    setObservations((prevObservations) => ({
      ...prevObservations,
      [bemId]: value,
    }));
  };

  const handleQuantidadeChange = (bemId, value) => {
    const quantidade = value && value > 0 ? value : 1;
    setQuantidadeBem((prevQuantidade) => ({
      ...prevQuantidade,
      [bemId]: quantidade,
    }));
  };

  return (
    <div className="p-6 flex gap-6 mx-auto">
      <div className={`${showNextPart ? "w-1/2" : "w-full"}`}>
        {!showNextPart ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Pesquisar usuário
            </h1>
            <UserLookup onUserSelect={handleUserSelect} />
            {selectedUser && (
              <div className="mt-4 p-4 bg-green-200 text-customGrey rounded-lg shadow-md max-w-lg mx-auto">
                <h2 className="text-xl font-semibold">Usuário selecionado</h2>
                <p>Nome: {selectedUser.username}</p>
                <p>ID: {selectedUser.id}</p>
                <p>Email: {selectedUser.email}</p>
              </div>
            )}
            {selectedUser && (
              <div className="max-w-lg mx-auto flex justify-end">
                <button
                  onClick={handleNextClick}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={`p-6 bg-customGreyLight rounded-lg shadow-lg`}>
            <h2 className="text-2xl font-bold mb-4">Usuário selecionado</h2>
            <div className="bg-customGrey p-4 rounded-lg shadow mb-4">
              <p className="font-semibold text-lg">{selectedUser.name}</p>
              <p>ID: {selectedUser.id}</p>
              <p>Email: {selectedUser.email}</p>
            </div>

            <h2 className="text-2xl mb-4 text-center mt-10">
              Selecione bens para reservar
            </h2>
            <BemLookup
              selectedBems={selectedBems}
              onBemSelect={handleBemSelect}
            />

            <button
              onClick={handleFinishClick}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Retirar
            </button>
          </div>
        )}
      </div>
      {selectedBems.length > 0 && (
        <div className="w-1/2">
          <div className="w-550 p-4 bg-green-200 text-customGrey rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Bens selecionados</h2>
            <ul>
              {selectedBems.map((bem, index) => (
                <li
                  key={`${bem.id}-${index}`}
                  className={`${
                    selectedBems[0].id_bem === bem.id_bem ? "border-t-2" : ""
                  } border-b-2 border-white py-2 flex items-center justify-center`}
                >
                  <div className="flex gap-4 items-center text-center">
                    <p>ID: {bem.id_bem}</p>
                    <p>Descrição: {bem.descricao}</p>

                    <input
                      type="number"
                      min="1"
                      value={quantidadeBem[bem.id_bem] || 1}
                      onChange={(e) =>
                        handleQuantidadeChange(bem.id_bem, e.target.value)
                      }
                      placeholder="Quantidade de itens"
                      className="border rounded-md p-2 bg-customGrey text-white"
                    />

                    <input
                      type="text"
                      placeholder="Observação"
                      value={observations[bem.id_bem] || ""}
                      onChange={(e) =>
                        handleObservationChange(bem.id_bem, e.target.value)
                      }
                      className="border rounded-md p-2 bg-customGrey text-white"
                    />
                    <button
                      className="mt-4 mb-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => removeBem(bem.id_bem)}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <ItensRetiradaModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        selectedBems={selectedBems}
        selectedRetirada={selectedRetirada}
        dataLimite={moment(
          selectedRetirada?.data_retirada,
          "YYYY-MM-DD HH:mm:ss"
        ).format("DD/MM/YYYY")}
        observations={observations}
        quantity={quantidadeBem}
      />
    </div>
  );
};

export default Retirada;
