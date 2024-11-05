import React, { useState } from "react";

const BemLookup = ({ selectedBems, onBemSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBems, setFilteredBems] = useState([]);

  // Mock data for demonstration purposes
  const mockBems = [
    { id: 1, name: "BEM One", description: "Description of BEM One" },
    { id: 2, name: "BEM Two", description: "Description of BEM Two" },
    { id: 3, name: "BEM Three", description: "Description of BEM Three" },
  ];

  // Function to handle input changes
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter the BEMs based on the search term
    if (term) {
      const results = mockBems.filter(
        (bem) =>
          bem.name.toLowerCase().includes(term.toLowerCase()) ||
          bem.id.toString().includes(term)
      );
      setFilteredBems(results);
    } else {
      setFilteredBems([]); // Reset to no results if search term is empty
    }
  };

  const handleSelect = (bem) => {
    onBemSelect(bem); // Call the onBemSelect function passed from parent
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Busque por um Bem por ID ou nome"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full bg-customGrey rounded-md"
      />
      {searchTerm && filteredBems.length > 0 && (
        <ul>
          {filteredBems.map((bem) => (
            <li
              key={bem.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{bem.name}</span>
              <button
                onClick={() => handleSelect(bem)}
                className={`bg-blue-500 text-white px-2 py-1 rounded-lg ${
                  selectedBems.some((selectedBem) => selectedBem.id === bem.id)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedBems.some(
                  (selectedBem) => selectedBem.id === bem.id
                )} // Disable button if already selected
              >
                {selectedBems.some((selectedBem) => selectedBem.id === bem.id)
                  ? "Selected"
                  : "Select"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BemLookup;
