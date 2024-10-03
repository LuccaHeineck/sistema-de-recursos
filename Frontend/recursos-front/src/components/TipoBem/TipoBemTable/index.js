import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const TipoBemTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-customBlue dark:text-customWhite1">
          <tr>
            <th scope="col" className="text-center px-6 py-3">
              ID
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Tipo Bem
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
                  ? "bg-white dark:bg-customGreyLight"
                  : "bg-gray-50 dark:bg-customGrey"
              } border-b dark:border-customGreyLight`}
            >
              <td className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.id_tipo_bem}
              </td>

              <td className="text-center px-6 py-4">{item.tipo_bem}</td>

              <td className="text-center px-4 py-4 flex justify-center space-x-4">
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

export default TipoBemTable;
