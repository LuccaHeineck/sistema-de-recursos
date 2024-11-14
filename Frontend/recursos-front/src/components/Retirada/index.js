import axios from "axios";
import React, { useState } from "react";
import BemLookup from "./BemLookup";
import UserLookup from "./UserLookup";

const Retirada = () => {
  const [showNextPart, setShowNextPart] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBems, setSelectedBems] = useState([]);

  const API_URL = "http://localhost:8000/retiradas/";

  // const today = new Date();
  // today.setHours(today.getHours() - 3);

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
    try {
      const retirada = {
        data_retirada: today.format("YYYY-MM-DD HH:mm:ss"),
        status_retirada: "Em andamento",
        motivo_retirada: "TCC",
        id_pessoa: selectedUser.id,
      };

      const response = await axios.post(API_URL + "criar/", retirada, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("TESTE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeBem = (bemId) => {
    setSelectedBems((prevSelectedBems) =>
      prevSelectedBems.filter((bem) => bem.id_bem !== bemId)
    );
  };

  return (
    <div className="p-6 flex gap-6 max-w-5xl mx-auto">
      <div className="w-2/3">
        {!showNextPart ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Pesquisar usuário
            </h1>
            <UserLookup onUserSelect={handleUserSelect} />
            {selectedUser && (
              <div className="mt-4 p-4 bg-green-200 text-customGrey rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Usuário selecionado</h2>
                <p>Nome: {selectedUser.username}</p>
                <p>ID: {selectedUser.id}</p>
                <p>Email: {selectedUser.email}</p>
              </div>
            )}
            {selectedUser && (
              <button
                onClick={handleNextClick}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Próximo
              </button>
            )}
          </>
        ) : (
          <div className="p-6 bg-customGreyLight rounded-lg shadow-lg">
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
      <div className="w-1/2">
        {selectedBems.length > 0 && (
          <div className="w-100 p-4 bg-green-200 text-customGrey rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Bens selecionados</h2>
            <ul>
              {selectedBems.map((bem, index) => (
                <li
                  key={`${bem.id}-${index}`}
                  className={`${
                    selectedBems[0].id_bem === bem.id_bem ? "border-t-2" : ""
                  } border-b-2 border-white py-2 flex items-center justify-between`}
                >
                  <div className="flex gap-9">
                    <p>ID: {bem.id_bem}</p>
                    <p>Descrição: {bem.descricao}</p>
                  </div>
                  <button
                    className="mt-4 mb-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => removeBem(bem.id_bem)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Retirada;
