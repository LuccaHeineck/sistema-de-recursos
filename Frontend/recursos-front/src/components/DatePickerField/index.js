import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";
import "../DatePickerField/DatePickerField.css";

const DatepickerField = ({ label, selectedDate, onChange, placeholder }) => {
  // Format date function (move it above to avoid the reference error)
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [dateInput, setDateInput] = useState(
    selectedDate ? formatDate(selectedDate) : ""
  );

  const handleDateChange = (date) => {
    setDateInput(formatDate(date)); // Update input field when date is picked
    onChange(date); // Update the parent with the selected date
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setDateInput(newValue); // Update the input value on each change
  };

  const handleBlur = () => {
    if (dateInput.length === 10) {
      const dateParts = dateInput.split("/");
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const validDate = new Date(year, month, day);
        if (
          validDate.getDate() === day &&
          validDate.getMonth() === month &&
          validDate.getFullYear() === year
        ) {
          onChange(validDate); // Update the parent with a valid date
        } else {
          setDateInput(""); // Clear invalid date
        }
      }
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        customInput={
          <InputMask
            mask="99/99/9999"
            value={dateInput || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placeholder || "DD/MM/YYYY"}
            className="fieldsData"
          />
        }
      />
    </div>
  );
};

export default DatepickerField;
