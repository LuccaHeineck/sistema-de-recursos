import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-md ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-customBlue dark:text-customWhite1">
          <tr>
            <th scope="col" className="text-center px-6 py-3">
              ID
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Tipo
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Criado por
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Status
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Permite reserva
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Criado em
            </th>
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
              } border-b dark:border-customGreyLight`}
            >
              <th
                scope="row"
                className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.id_bem}
              </th>

              <td className="break-all px-6 py-4">{item.descricao}</td>
              <td className="text-center px-6 py-4">{item.id_tipo_bem_nome}</td>
              <td className="text-center px-6 py-4">{item.created_by}</td>
              <td className="text-center px-6 py-4">
                {item.status_bem === "R" ? "Retirado" : "Disponível"}
              </td>
              <td className="text-center px-6 py-4">
                {item.permite_reserva ? "Sim" : "Não"}
              </td>
              <td className="text-center pl-2 pr-2 py-2">
                {item.created_at.slice(0, 10)}
              </td>
              <td className="text-center px-4 py-4">
                <button
                  onClick={() => onEdit(item)}
                  className="font-medium text-blue-600 dark:text-customYellow hover:underline"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="font-medium text-blue-600 dark:text-red-400 hover:underline ml-2"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
