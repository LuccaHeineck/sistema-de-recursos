import Modal from "react-modal";
import GenericTable from "../../GenericTable";

const moment = require("moment");
const now = moment();

const columns = [
  { header: "ID", accessor: "id_bem" },
  { header: "Bem", accessor: "descricao" },
  //{ header: "Retirada", accessor: "created_at" },
  //dias em atraso
  { header: "Observações", accessor: "observacoes" },
  // renovações
];

const ItensRetiradaModal = ({
  isOpen,
  onRequestClose,
  selectedBems,
  handleConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Resumo dos Itens para Retirada"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-xs"
    >
      {selectedBems && (
        <div
          className="bg-customGrey border border-customGreyLight text-white p-8 rounded-lg mx-auto font-poppins"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h2 className="text-2xl font-semibold mb-7">
            Resumo da retirada (número da retirada)
          </h2>
          <div className="space-y-4">
            <GenericTable
              columns={columns}
              data={selectedBems}
              actions={false}
            ></GenericTable>
            <p>Data da retirada: {now.toDate}</p>
          </div>

          <div className="flex gap-4 justify-end mt-6">
            <button
              type="button"
              onClick={onRequestClose}
              className="inline-flex items-center px-6 py-2 border text-sm font-medium rounded-md shadow-sm text-white bg-customGrey hover:bg-customGreyLight border-customBlue"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customBlue hover:bg-blue-900"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ItensRetiradaModal;
