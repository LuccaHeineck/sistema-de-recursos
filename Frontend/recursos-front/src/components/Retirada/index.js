import React, { useState } from "react";
import UserLookup from "./UserLookup";
import BemLookup from "./BemLookup";

const Retirada = () => {
  const [showNextPart, setShowNextPart] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBems, setSelectedBems] = useState([]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBemSelect = (selectedBem) => {
    setSelectedBems((prevSelectedBems) => [...prevSelectedBems, selectedBem]);
  };

  const handleNextClick = () => {
    setShowNextPart(true);
  };

  const handleFinishClick = () => {
    // Finalize the process or submit the selected data
    alert("Process finished with selected user and Bems.");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
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
          <h2 className="text-2xl font-bold mb-4">Selected User</h2>
          <div className="bg-customGrey p-4 rounded-lg shadow mb-4">
            <p className="font-semibold text-lg">{selectedUser.name}</p>
            <p>ID: {selectedUser.id}</p>
            <p>Email: {selectedUser.email}</p>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center">
            Selecione bens para reservar
          </h2>
          <BemLookup
            selectedBems={selectedBems}
            onBemSelect={handleBemSelect}
          />

          {selectedBems.length > 0 && (
            <div className="mt-4 p-4 bg-green-200 text-customGrey rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Bens selecionados</h2>
              <ul>
                {selectedBems.map((bem, index) => (
                  <li key={`${bem.id}-${index}`} className="border-b py-2">
                    <p className="font-semibold">{bem.name}</p>
                    <p>ID: {bem.id}</p>
                    <p>Descrição: {bem.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleFinishClick}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Retirar
          </button>
        </div>
      )}
    </div>
  );
};

export default Retirada;
