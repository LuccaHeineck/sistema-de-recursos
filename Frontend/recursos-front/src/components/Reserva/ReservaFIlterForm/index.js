import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../ReservaFilterForm/Reserva.css";
import DatepickerField from "../../DatePickerField";

const ReservaFilterForm = ({ onFilter }) => {
  const [id, setId] = useState("");
  const [idPessoa, setIdPessoa] = useState("");
  const [pessoaName, setPessoaName] = useState("");
  const [dataReserva, setDataReserva] = useState("");
  const [dataValidade, setDataValidade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      id_reserva: id,
      id_pessoa: idPessoa,
      pessoa_name: pessoaName,
      data_reserva: dataReserva,
      data_validade_reserva: dataValidade,
    };

    onFilter(filters);
  };

  const clearForm = () => {
    setId("");
    setIdPessoa("");
    setPessoaName("");
    setDataReserva("");
    setDataValidade("");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Pesquisa de Reservas</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-16">
          <div>
            <label className="block mb-1 text-md" htmlFor="id">
              ID Reserva
            </label>
            <input
              className="fields"
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID Reserva..."
            />
          </div>

          <div>
            <label className="block mb-1 text-md" htmlFor="idPessoa">
              ID Pessoa
            </label>
            <input
              className="fields"
              type="text"
              id="idPessoa"
              value={idPessoa}
              onChange={(e) => setIdPessoa(e.target.value)}
              placeholder="ID Pessoa..."
            />
          </div>

          <div>
            <label className="block mb-1 text-md" htmlFor="dataReserva">
              Data Reserva
            </label>
            <DatepickerField
              label="Data Reserva"
              selectedDate={dataReserva}
              onChange={(date) => setDataReserva(date)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div>
            <label className="block mb-1 text-md" htmlFor="dataValidade">
              Data Validade
            </label>
            <DatepickerField
              label="Data Validade"
              selectedDate={dataValidade}
              onChange={(date) => setDataValidade(date)}
              placeholder="DD/MM/YYYY"
            />
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

          <button
            className="relative mb-6 border border-red-600 flex items-center justify-center p-2 px-7 text-lg rounded-md bg-transparent text-red-600 overflow-hidden transition duration-300 group"
            type="button"
            onClick={clearForm}
          >
            <span className="absolute inset-0 bg-red-600 rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-150 group-hover:origin-bottom"></span>
            <span className="relative transition duration-300 group-hover:text-customGrey">
              Limpar
            </span>
          </button>

          <Link
            to="/reserva/inserir"
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

export default ReservaFilterForm;
