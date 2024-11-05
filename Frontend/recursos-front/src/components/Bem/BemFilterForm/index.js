import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../BemFilterForm/Filters.css";

const BemFilterForm = ({ onFilter, tiposBem }) => {
  // Estados para armazenar os valores dos filtros
  const [idBem, setIdBem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [permiteReserva, setPermiteReserva] = useState("");
  const [statusBem, setStatusBem] = useState("");
  const [idTipoBem, setIdTipoBem] = useState("");
  const [criadoPor, setCriadoPor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      id_bem: idBem,
      descricao,
      created_by: criadoPor,
      status_bem: statusBem,
      id_tipo_bem: idTipoBem,
    };

    if (permiteReserva !== "") {
      filters.permite_reserva = permiteReserva;
    }

    onFilter(filters);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Pesquisa de Bens</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-16">
          <div>
            <label className="block mb-1 text-md" htmlFor="idBem">
              ID Bem
            </label>
            <input
              className="fields"
              type="text"
              id="idBem"
              value={idBem}
              onChange={(e) => setIdBem(e.target.value)}
              placeholder="ID Bem..."
            />
          </div>

          <div>
            <label className="block mb-1 text-md" htmlFor="descricao">
              Descrição
            </label>
            <input
              className="fields"
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição..."
            />
          </div>

          <div>
            <label className="block mb-1 text-md" htmlFor="criadoPor">
              Criado Por
            </label>
            <input
              className="fields"
              type="text"
              id="criadoPor"
              value={criadoPor}
              onChange={(e) => setCriadoPor(e.target.value)}
              placeholder="Criado por..."
            />
          </div>

          <div>
            <label className="block mb-1 mt-2 text-md" htmlFor="permiteReserva">
              Permite Reserva
            </label>
            <select
              className="fieldsCombo"
              id="permiteReserva"
              value={permiteReserva}
              onChange={(e) => setPermiteReserva(e.target.value)}
            >
              <option value=""></option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 mt-2 text-md" htmlFor="statusBem">
              Status Bem
            </label>
            <select
              className="fieldsCombo"
              id="statusBem"
              value={statusBem}
              onChange={(e) => setStatusBem(e.target.value)}
            >
              <option value=""></option>
              <option value="D">Disponível</option>
              <option value="R">Retirado</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 mt-2 text-md" htmlFor="idTipoBem">
              Tipo Bem
            </label>
            <select
              className="fieldsCombo"
              id="idTipoBem"
              value={idTipoBem}
              onChange={(e) => setIdTipoBem(e.target.value)}
            >
              <option value=""></option>
              {tiposBem.map((tipo) => (
                <option key={tipo.id_tipo_bem} value={tipo.tipo_bem}>
                  {tipo.tipo_bem}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-5 ">
          <button
            className="relative mb-6 border border-customBlue flex items-center justify-center p-2 px-7 text-lg rounded-md bg-transparent text-customBlue overflow-hidden transition duration-300 group"
            type="submit"
          >
            <span className="absolute inset-0 bg-customBlue rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-150 group-hover:origin-bottom"></span>
            <span className="relative transition duration-300 group-hover:text-white">
              Filtrar
            </span>
          </button>

          <Link
            to="/bem/inserir"
            className="relative mb-6 border border-customYellow flex items-center justify-center p-2 px-7 text-lg rounded-md bg-transparent text-customYellow overflow-hidden transition duration-300 group"
          >
            <span className="absolute inset-0 bg-customYellow rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-150 group-hover:origin-bottom"></span>
            <span className="relative transition duration-300 group-hover:text-customGrey">
              Criar novo
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BemFilterForm;
