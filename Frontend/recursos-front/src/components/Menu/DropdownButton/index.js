import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DropdownButton = ({ label, Icon, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.style.maxHeight = isOpen
        ? `${dropdownRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between p-3 text-lg text-customLightGrey ${
          isOpen
            ? "rounded-tr-lg rounded-tl-lg bg-slate-950"
            : "rounded-lg hover:bg-customGrey"
        }`}
      >
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="ml-2 w-5 h-5" />}
          <span className="pl-2">{label}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        ref={dropdownRef}
        className={`w-full bg-customGrey rounded-br-lg rounded-bl-lg shadow-lg overflow-hidden transition-max-height duration-500 ease-in-out`}
      >
        {Object.entries(options).map(
          ([option, { path, icon: OptionIcon, label }]) => (
            <a
              key={path}
              href={path}
              className="flex pl-5 items-center space-x-4 p-3 text-lg text-customLightGrey rounded-lg hover:bg-slate-900"
            >
              {OptionIcon && <OptionIcon className="w-5 h-5" />}
              <span>{label}</span>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default DropdownButton;
