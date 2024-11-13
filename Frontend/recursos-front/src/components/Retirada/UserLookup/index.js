// UserLookup.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lookup.css";

const UserLookup = ({ onUserSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/recursos/";
  const isNumeric = !isNaN(query);

  // Pesquisa em tempo real
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        handleSearch();
      } else {
        setResults([]); // Limpa os resultados se não houver query
      }
    }, 150); // Atraso de 150ms

    return () => {
      clearTimeout(handler); // Limpa o timeout se a query mudar antes do tempo
    };
  }, [query]);

  const handleSearch = async () => {
    // Verifica se o query é um número (id) ou uma string (username)
    setLoading(true);
    try {
      const response = await axios.get(
        API_URL +
          `users/${isNumeric ? `${query}` : `?username=${query}&limit=10`}`
      );

      setResults(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (error) {
      setResults([]);
    }
    setLoading(false);
  };

  const handleUserSelect = (user) => {
    onUserSelect(user);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquise por ID ou nome"
          className="border bg-customGrey border-gray-300 rounded-lg p-2 flex-grow mr-2"
        />
        {/* <button
          onClick={handleSearch}
          disabled={!query}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-blue-300"
          style={}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button> */}
      </div>
      {results.length > 0 && (
        <ul className="mt-4 bg-customGreyDark shadow-md rounded-lg p-4 ">
          {results.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="border-b last:border-b-0 p-2 hover:bg-customGreyLight cursor-pointer rounded-md"
            >
              <p className="font-semibold text-lg">{user.name}</p>
              <p>ID: {user.id}</p>
              <p>Nome: {user.username}</p>
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      )}
      {query && !loading && results.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          Usuário com
          {isNumeric
            ? ` id: ${query} não encontrado`
            : ` ${query} não encontrado`}
        </p>
      )}
    </div>
  );
};

export default UserLookup;
// teste
