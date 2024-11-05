// UserLookup.js
import React, { useState } from "react";
import axios from "axios";
import "./Lookup.css";

const UserLookup = ({ onUserSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  //   const handleSearch = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`/api/users/search/?query=${query}`);
  //       setResults(response.data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //     setLoading(false);
  //   };

  const mockData = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Sam Wilson", email: "sam.wilson@example.com" },
  ];

  const handleSearch = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      // Filter mock data based on query matching ID or name
      const filteredResults = mockData.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.id.toString() === query
      );
      setResults(filteredResults);
      setLoading(false);
    }, 500); // Simulate a short delay
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
          placeholder="Search by ID or name"
          className="border bg-customGrey border-gray-300 rounded-lg p-2 flex-grow mr-2"
        />
        <button
          onClick={handleSearch}
          disabled={!query}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-blue-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
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
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      )}
      {query && !loading && results.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default UserLookup;
