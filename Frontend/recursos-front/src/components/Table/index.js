import GenericTable from "../GenericTable";

const Table = ({ data, onEdit, onDelete }) => {
  const columns = [
    { header: "ID", accessor: "id_bem" },
    { header: "Descrição", accessor: "descricao" },
    { header: "Tipo", accessor: "id_tipo_bem_nome" },
    {
      header: "Status",
      render: (item) =>
        item.status_bem === "R" ? "Indisponível" : "Disponível",
    },
    { header: "Quantidade", accessor: "quantidade_bem" },
    {
      header: "Permite reserva",
      render: (item) => (item.permite_reserva ? "Sim" : "Não"),
    },
    {
      header: "Criado em",
      render: (item) => item.created_at.slice(0, 10),
    },
    { header: "Criado por", accessor: "created_by" },
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

export default Table;
