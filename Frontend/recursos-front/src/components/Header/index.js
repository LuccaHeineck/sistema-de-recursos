import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Header.js
const Header = () => {
  const location = useLocation();
  //const [username, setUsername] = useState(""); // Inicializando como string

  /*
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/recursos/usuario_logado/")
      .then((response) => {
        setUsername(response.data.username); // Salvando o nome de usuário da resposta
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
*/
  return (
    <header className="bg-customGrey border-b-1 border-customGreyLight text-white p-4 h-16 flex items-center justify-between">
      <h1 className="text-xl font-bold">{location.pathname}</h1>
      <label className="mr-4 ml-auto">
        {/*username ? username : "Carregando..."*/}
      </label>{" "}
      {/* Exibe o nome do usuário ou 'Carregando...' */}
    </header>
  );
};

export default Header;
