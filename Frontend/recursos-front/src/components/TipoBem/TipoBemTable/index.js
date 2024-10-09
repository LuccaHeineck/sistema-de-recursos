import GenericTable from "../../GenericTable";

const TipoBemTable = ({ data, onEdit, onDelete }) => {
  const columns = [
    { header: "ID", accessor: "id_tipo_bem" },
    { header: "Tipo Bem", accessor: "tipo_bem" },
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

export default TipoBemTable;
