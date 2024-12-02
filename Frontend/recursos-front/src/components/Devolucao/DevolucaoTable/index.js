import GenericTable from "../../GenericTable";

const DevolucaoTable = ({ data, onEdit, onDelete, rendered }) => {
  const columns = [
    { header: "ID Retirada", accessor: "id_retirada" },
    { header: "Bem", accessor: "nome_bem" },
    { header: "Quantidade", accessor: "quantidade_bem" },
    {
      header: "Data retirada",
      render: (item) =>
        item.data_retirada
          ? item.data_retirada.slice(0, 10)
          : "Data não disponível",
    },
    {
      header: "Data limite",
      render: (item) =>
        item.data_limite
          ? item.data_limite.slice(0, 10)
          : "Data não disponível",
    },
    { header: "Observação", accessor: "observacao" },
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

export default DevolucaoTable;
