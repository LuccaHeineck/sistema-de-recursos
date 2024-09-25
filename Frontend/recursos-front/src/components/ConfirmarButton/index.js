import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensure to set the correct app element for accessibility

const ConfirmarButton = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Action"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-xs"
    >
      <div
        className="bg-customGrey border border-customGreyLight text-white p-8 rounded-lg mx-auto font-poppins"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-10 mt-10">
          <button
            onClick={onConfirm}
            className="inline-flex items-center px-10 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customBlue hover:bg-blue-900"
          >
            Sim
          </button>
          <button
            onClick={onRequestClose}
            className="inline-flex items-center px-10 py-2 border border-customBlue text-sm font-medium rounded-md shadow-sm text-white bg-customGrey hover:bg-customGreyLight"
          >
            Não
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmarButton;
