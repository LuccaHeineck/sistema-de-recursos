import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLookup from "../Retirada/UserLookup";
import DevolucaoTable from "./DevolucaoTable";
import { CSSTransition } from "react-transition-group";
import "./Devolucao.css";

const Devolucao = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [dataDevolver, setDataDevolver] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const moment = require("moment");
  const today = moment();

  useEffect(() => {
    if (selectedUser && selectedUser.id) {
      fetchRetiradas();
    }
  }, [selectedUser]);

  const fetchRetiradas = () => {
    if (selectedUser && selectedUser.id) {
      axios
        .get(
          `http://127.0.0.1:8000/retiradas/itens/listar-pessoa/${selectedUser.id}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    } else {
      console.log("No user selected");
    }
  };

  const handleDevolver = async (e) => {
    let sucesso = false;

    for (let item of dataDevolver) {
      console.log(item);
      const updatedItem = {
        id_retirada: item.id_retirada,
        id_bem: item.id_bem,
        quantidade_bem: item.quantidade_bem,
        data_devolucao: today.format("YYYY-MM-DD HH:mm:ss"),
        data_retirada: item.data_retirada,
        data_limite: item.data_limite,
        status_retirada: "Devolvido",
        observacao: "",
      };

      const url = `http://127.0.0.1:8000/retiradas/itens/editar/${item.id_retirada}/${item.id_bem}`;

      e.preventDefault();
      axios
        .put(url, updatedItem)
        .then((response) => {
          console.log("Devolução realizada com sucesso!", response);
          setShowSuccess(true);
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response:", error.response);
          } else if (error.request) {
            console.error("No response from server:", error.request);
          } else {
            console.error("Request setup error:", error.message);
          }
        });

      const bemResponse = await axios.get(
        `http://127.0.0.1:8000/bem/listar/?id_bem=${item.id_bem}`
      );

      const bemData = bemResponse.data.results[0];
      const updatedBemData = {
        status_bem: "D",
        quantidade_bem: bemData.quantidade_bem + item.quantidade_bem,
      };

      console.log(updatedBemData.quantidade_bem);

      axios.patch(
        `http://127.0.0.1:8000/bem/editar/${item.id_bem}/`,
        updatedBemData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    setSelectedUser(null);
    setDataDevolver([]);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleUserSelect = (user) => {
    console.log("User selected:", user);
    setSelectedUser(user);
  };

  const onDevolver = (item) => {
    const updatedData = data.filter(
      (i) => i.id_bem !== item.id_bem || i.id_retirada !== item.id_retirada
    );

    const updatedDataDevolver = [...dataDevolver, item];

    setData(updatedData);
    setDataDevolver(updatedDataDevolver);
  };

  const onVoltar = (item) => {
    const updatedData = [...data, item];

    const updatedDataDevolver = dataDevolver.filter(
      (i) => i.id_bem !== item.id_bem || i.id_retirada !== item.id_retirada
    );

    setData(updatedData);
    setDataDevolver(updatedDataDevolver);
  };

  return (
    <div>
      <div className="flex justify-start items-start gap-4 w-2/3 mx-auto">
        <CSSTransition
          in={showSuccess}
          timeout={300}
          classNames="success"
          unmountOnExit
        >
          <div className="fixed left-1/2 top-4 z-50 mb-4 p-4 bg-green-100 rounded-sm border-l-4 border-green-500 text-green-700">
            <p>Devolução realizada com sucesso!</p>
          </div>
        </CSSTransition>
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
          <DevolucaoTable data={data} devolver={true} onDevolver={onDevolver} />
        </div>

        <div className="w-1/2">
          <DevolucaoTable
            data={dataDevolver}
            voltar={true}
            onVoltar={onVoltar}
          />
        </div>
      </div>

      <br />
      <br />

      <div
        className={`flex justify-center ${
          Array.isArray(dataDevolver) && dataDevolver.length === 0
            ? "invisible"
            : ""
        }`}
      >
        <button
          className="relative mb-6 border border-customYellow flex items-center justify-center p-2 px-7 text-lg rounded-md bg-transparent text-customYellow overflow-hidden transition duration-300 group"
          type="button"
          onClick={handleDevolver}
        >
          <span className="absolute inset-0 bg-customYellow rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-150 group-hover:origin-bottom"></span>
          <span className="relative transition duration-300 group-hover:text-customGrey">
            Devolver itens
          </span>
        </button>
      </div>
    </div>
  );
};

export default Devolucao;
