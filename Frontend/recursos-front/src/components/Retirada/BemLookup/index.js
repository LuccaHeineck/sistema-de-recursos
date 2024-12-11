import React, { useState, useEffect } from "react";
import axios from "axios";

const BemLookup = ({ selectedBems, onBemSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_URL = "http://127.0.0.1:8000/bem/listar/";
  const isNumeric = !isNaN(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 150);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        API_URL + `${isNumeric ? `?id_bem=${query}` : `?descricao=${query}`}`
      );
      setResults(response.data.results);
    } catch (error) {
      setResults([]);
    }
  };

  const handleSelect = (bem) => {
    onBemSelect(bem);
    // setQuery("");
    // setResults([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Busque por um Bem por ID ou nome"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full bg-customGrey rounded-md"
      />
      {query && results.length > 0 && (
        <ul>
          {results.map((bem) => (
            <li key={bem.id_bem} className="flex items-center border-b py-2">
              <span>{bem.id_bem}</span>
              <span className="ml-5">{bem.descricao}</span>
              <button
                onClick={() => handleSelect(bem)}
                className={`ml-auto bg-blue-500 text-white px-2 py-1 rounded-lg ${
                  selectedBems.some(
                    (selectedBem) => selectedBem.id_bem === bem.id_bem
                  )
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedBems.some(
                  (selectedBem) => selectedBem.id_bem === bem.id_bem
                )} // Disable button if already selected
              >
                {selectedBems.some(
                  (selectedBem) => selectedBem.id_bem === bem.id_bem
                )
                  ? "Selecionado"
                  : "Selecione"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BemLookup;
