import React, { useState, useEffect } from "react";
import axios from "axios";

const BemCreateForm = () => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    descricao: "",
    permite_reserva: false,
    status_bem: "D",
    id_tipo_bem: "",
  });

  const [tiposBem, setTiposBem] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Função para buscar os tipos de bem
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bem/tipo_bem/listar/")
      .then((response) => {
        setTiposBem(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching tipos de bem!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/bem/cadastrar/", formData)
      .then((response) => {
        // Exibir a mensagem de sucesso
        setSuccess(true);

        // Limpar os dados do formulário após o sucesso
        setFormData({
          descricao: "",
          permite_reserva: false,
          status_bem: "D", // Definindo como Disponível (ou ajustável)
          id_tipo_bem: 2,
        });

        // Ocultar a mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o bem!", error);
        setError("Erro ao cadastrar o bem.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-black text-2xl font-bold mb-6">Cadastrar Bem</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">Bem cadastrado com sucesso!</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            className="bg-customGrey text-white mt-1 block w-full p-2 border border-customLightGrey rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tipo do bem</label>
          <select
            name="id_tipo_bem"
            value={formData.id_tipo_bem}
            onChange={handleChange}
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
              value={formData.status_bem}
              onChange={handleChange}
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
              value={formData.permite_reserva}
              onChange={handleChange}
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
        </div>
      </form>
    </div>
  );
};

export default BemCreateForm;
