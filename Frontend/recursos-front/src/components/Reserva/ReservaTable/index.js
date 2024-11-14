import GenericTable from "../../GenericTable";

const ReservaTable = ({ data, onEdit, onDelete }) => {
  const columns = [
    { header: "ID", accessor: "id_reserva" },
    { header: "ID Pessoa", accessor: "id_pessoa" },
    { header: "Pessoa", accessor: "pessoa_name" },
    {
      header: "Data reserva",
      render: (item) =>
        item.data_reserva
          ? item.data_reserva.slice(0, 10)
          : "Data não disponível",
    },
    {
      header: "Data validade",
      render: (item) =>
        item.data_validade_reserva
          ? item.data_validade_reserva.slice(0, 10)
          : "Data não disponível",
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={data}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default ReservaTable;
