import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import GenericTable from "../../GenericTable";
import DatepickerField from "../../DatePickerField";
import axios from "axios";
import moment from "moment";

const API_URL = "http://localhost:8000/retiradas/";

const columns = [
  { header: "ID", accessor: "id_bem" },
  { header: "Bem", accessor: "descricao" },
  { header: "Observações", accessor: "observacao" },
];

const ItensRetiradaModal = ({
  isOpen,
  onRequestClose,
  selectedBems,
  selectedRetirada,
  observations,
  quantity,
}) => {
  const [dataLimite, setDataLimite] = useState(null);
  const [motivoRetirada, setMotivoRetirada] = useState("TCC");

  // Função que define a dataLimite, que é a data de retirada + 7 dias
  const setInitialDate = () => {
    if (selectedRetirada?.data_retirada) {
      const initialDate = moment(
        selectedRetirada.data_retirada,
        "YYYY-MM-DD HH:mm:ss"
      )
        .add(7, "days")
        .format("MM/DD/YYYY HH:mm:ss");
      setDataLimite(initialDate);
    }
  };

  useEffect(() => {
    setInitialDate();
  }, [selectedRetirada]);

  const confirmRetirada = async () => {
    try {
      selectedRetirada.motivo_retirada = motivoRetirada;
      const response = await axios.post(API_URL + "criar/", selectedRetirada, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        selectedRetirada.idRetirada = response.data.id_retirada;

        const itensRetiradaData = selectedBems.map((bem) => ({
          id_retirada: selectedRetirada.idRetirada,
          id_bem: bem.id_bem,
          quantidade_bem: quantity[bem.id_bem],
          data_retirada: selectedRetirada.data_retirada,
          data_devolucao: null,
          data_limite: moment(dataLimite, "MM/DD/YYYY HH:mm:ss").format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          status_retirada: "Retirado",
          observacao: observations[bem.id_bem] || null,
        }));

        for (const bem of selectedBems) {
          const updatedBem = {
            status_bem: "D",
          };

          if (quantity[bem.id_bem] === 0) {
            updatedBem.status_bem = "R";
          }
          await axios.patch(
            `http://127.0.0.1:8000/bem/editar/${bem.id_bem}/`,
            updatedBem,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        for (const item of itensRetiradaData) {
          await axios.post(API_URL + "itens/criar", item, {
            headers: { "Content-Type": "application/json" },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          style={{ width: "70%" }}
        >
          <h2 className="text-2xl font-semibold mb-7">
            Resumo da retirada {selectedRetirada?.idRetirada}
          </h2>
          <div className="space-y-4">
            <GenericTable
              columns={columns}
              data={selectedBems}
              actions={false}
            ></GenericTable>
            <p>
              Data da retirada:
              {" " +
                moment(
                  selectedRetirada?.data_retirada,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD/MM/YYYY HH:mm:ss")}
            </p>
            <div className="flex">
              <div className="w-1/2">
                <label
                  className="block mb-1 mt-2 text-md"
                  htmlFor="dataReserva"
                >
                  Data Limite
                </label>
                <DatepickerField
                  selectedDate={dataLimite}
                  onChange={(date) => setDataLimite(date)}
                  placeholder="DD/MM/YYYY"
                  moment={true}
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 mt-2 text-md" htmlFor="statusBem">
                  Motivo Retirada
                </label>
                <select
                  className="fieldsCombo w-1/2"
                  id="statusBem"
                  value={motivoRetirada}
                  onChange={(e) => setMotivoRetirada(e.target.value)}
                >
                  <option value="TCC">Trabalho de Conclusão de Curso</option>
                  <option value="Aula">Aula</option>
                  <option value="Projetos">Projetos Acadêmicos</option>
                </select>
              </div>
            </div>
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
              onClick={confirmRetirada}
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
