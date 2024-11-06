import React, { useState, useEffect } from "react";
import axios from "axios";
import ReservaTable from "./ReservaTable";

const Reserva = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/reservas/listar/"
        );
        setData(response.data);
        console.log(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ReservaTable data={data.results}></ReservaTable>
    </div>
  );
};

export default Reserva;
