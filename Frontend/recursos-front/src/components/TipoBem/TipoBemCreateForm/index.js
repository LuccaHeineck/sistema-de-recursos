import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TipoBemCreateForm = () => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    tipo_bem: "",
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

    // Obtendo o token de acesso do localStorage (ou outro lugar onde você o tenha armazenado)
    const token = localStorage.getItem("token");

    // Configurando o header da requisição para incluir o token JWT
    axios
      .post("http://127.0.0.1:8000/bem/tipo_bem/cadastrar/", formData, {})
      .then((response) => {
        // Exibir a mensagem de sucesso
        setSuccess(true);

        // Limpar os dados do formulário após o sucesso
        setFormData({
          tipo_bem: "",
        });

        // Ocultar a mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o tipo bem!", error);
        setError("Erro ao cadastrar o tipo bem.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-customGreyLight shadow-md rounded-md">
      <h2 className="text-white text-2xl font-bold mb-6">Cadastrar Tipo Bem</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">Tipo Bem cadastrado com sucesso!</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Descrição:</label>
          <input
            type="text"
            name="tipo_bem"
            value={formData.tipo_bem}
            onChange={handleChange}
            required
            className="bg-customGreyLight text-white mt-1 block w-full p-2 border border-customLightGrey rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button>
            <Link
              to="/tipobem"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm border-customYellow text-customYellow bg-customGreyLight hover:bg-customGrey"
            >
              <span>Voltar</span>
            </Link>
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
  );
};

export default TipoBemCreateForm;
