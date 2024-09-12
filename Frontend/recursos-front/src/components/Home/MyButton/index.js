import { useState } from "react";

const MyButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    setIsProcessing(true);
    // Simulate a processing delay
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000); // Adjust the timeout as needed
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
        isProcessing
          ? "bg-indigo-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
      } transition-transform`}
      disabled={isProcessing}
    >
      {isProcessing && (
        <svg
          className="w-5 h-5 mr-2 -ml-1 text-white animate-spin motion-reduce:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
          ></path>
        </svg>
      )}
      {isProcessing ? "Processing..." : "Salvar"}
    </button>
  );
};

export default MyButton;
