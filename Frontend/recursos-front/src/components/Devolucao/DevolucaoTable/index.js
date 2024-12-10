import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const DevolucaoTable = ({
  data,
  onEdit,
  onDelete,
  rendered,
  devolver = false,
  onDevolver,
  voltar = false,
  onVoltar,
}) => {
  const columns = [
    { header: "ID Retirada", accessor: "id_retirada" },
    { header: "Bem", accessor: "bem" },
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
  ];

  return (
    <div>
      {devolver && (
        <h1 className="text-center text-xl mb-2">Itens Retirados</h1>
      )}

      {voltar && <h1 className="text-center text-xl mb-2">Devolver</h1>}
      <div className="relative overflow-x-auto shadow-md sm:rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-customBlue dark:text-customWhite1">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`text-center px-6 py-3 ${
                    index === 1 ? "w-1/4" : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
              <th scope="col" className="text-center px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "odd:bg-white odd:dark:bg-customGreyLight"
                    : "even:bg-gray-50 even:dark:bg-customGrey"
                } border-b dark:border-customGreyLight text-center`}
              >
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className={`px-6 py-4 ${
                      idx === 1
                        ? "break-all"
                        : idx === 0
                        ? "text-white"
                        : col.className
                    }`}
                  >
                    {col.render ? col.render(item) : item[col.accessor]}
                  </td>
                ))}
                {devolver && (
                  <td className="text-center px-4 py-4">
                    <button
                      onClick={() => onDevolver(item)}
                      className="font-medium text-blue-600 dark:text-customYellow hover:underline"
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  </td>
                )}
                {voltar && (
                  <td className="text-center px-4 py-4">
                    <button
                      onClick={() => onVoltar(item)}
                      className="font-medium text-blue-600 dark:text-red-600 hover:underline"
                    >
                      <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevolucaoTable;
