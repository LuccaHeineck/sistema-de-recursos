import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const GenericTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-customBlue dark:text-customWhite1">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="text-center px-6 py-3">
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

export default GenericTable;
