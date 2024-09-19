import { PencilIcon } from "@heroicons/react/24/outline";

const Table = ({ data, onEdit }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3">
              Criado por
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Permite reserva
            </th>
            <th scope="col" className="px-6 py-3">
              Criado em
            </th>
            <th scope="col" className="px-6 py-3">
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
                  ? "odd:bg-white odd:dark:bg-gray-900"
                  : "even:bg-gray-50 even:dark:bg-gray-800"
              } border-b dark:border-gray-700`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.id_bem}
              </th>

              <td className="px-6 py-4">{item.descricao}</td>
              <td className="px-6 py-4">{item.id_tipo_bem_nome}</td>
              <td className="px-6 py-4">{item.created_by}</td>
              <td className="px-6 py-4">
                {item.status_bem === "R" ? "Retirado" : "Disponível"}
              </td>
              <td className="px-6 py-4">
                {item.permite_reserva ? "Sim" : "Não"}
              </td>
              <td className="px-6 py-4">{item.created_at.slice(0, 10)}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(item)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <PencilIcon className="h-5 w-5" />
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
