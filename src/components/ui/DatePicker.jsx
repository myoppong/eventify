// src/components/ui/DatePicker.jsx
import React from "react";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ label, selected, onChange }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <DatePickerLib
      selected={selected}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-md"
      dateFormat="MMMM d, yyyy"
    />
  </div>
);

export default DatePicker;
