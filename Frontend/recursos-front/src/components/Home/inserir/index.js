import React, { useState } from "react";

const BemCreateForm = () => {
  const [formData, setFormData] = useState({
    descricao: "",
    permite_reserva: false,
    status_bem: "",
    id_tipo_bem: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/bem/cadastrar/", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          //  Authorization: `Bearer ${localStorage.getItem("token")}`, // Certifique-se de enviar o token de autenticação aqui
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar o bem.");
      }

      const data = await response.json();
      setSuccess(true);
      setFormData({
        descricao: "",
        permite_reserva: false,
        status_bem: "",
        id_tipo_bem: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-black	text-2xl font-bold mb-6">Cadastrar Bem</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">Bem cadastrado com sucesso!</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="permite_reserva"
            checked={formData.permite_reserva}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Permite Reserva
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            name="status_bem"
            value={formData.status_bem}
            onChange={handleChange}
            required
            className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Bem
          </label>
          <input
            type="text"
            name="id_tipo_bem"
            value={formData.id_tipo_bem}
            onChange={handleChange}
            required
            className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Cadastrar Bem
          </button>
        </div>
      </form>
    </div>
  );
};

export default BemCreateForm;
