import UserLookup from "../Retirada/UserLookup";
import axios from "axios";
import React, { useState } from "react";
import GenericTable from "../GenericTable";
import DevolucaoTable from "./DevolucaoTable";

const Devolucao = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);

  const fetchRetiradas = () => {
    axios
      .get(`http://127.0.0.1:8000/retiradas/listar/?${selectedUser}`)
      .then((response) => {
        // get nos itens
        // setdata como itens
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchRetiradas();
  };

  return (
    <div>
      <div className="flex justify-start items-start gap-4 w-2/3 mx-auto">
        <div className="flex-1 mr-20">
          <UserLookup onUserSelect={handleUserSelect} />
        </div>
        {selectedUser && (
          <div className="p-4 w-full max-w-md ml-10 bg-green-200 text-customGrey rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Usuário selecionado</h2>
            <p>Nome: {selectedUser.username}</p>
            <p>ID: {selectedUser.id}</p>
            <p>Email: {selectedUser.email}</p>
          </div>
        )}
      </div>

      <div
        className={`${
          selectedUser != null ? "" : "invisible"
        } flex gap-2 mt-10`}
      >
        <div className="w-1/2">
          <DevolucaoTable data={data} />
        </div>

        <div className="w-1/2">
          <DevolucaoTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Devolucao;
