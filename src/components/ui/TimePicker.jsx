// src/components/ui/TimePicker.jsx
import React from "react";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = ({ label, selected, onChange }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <DatePickerLib
      selected={selected}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      className="w-full px-3 py-2 border rounded-md"
    />
  </div>
);

export default TimePicker;
