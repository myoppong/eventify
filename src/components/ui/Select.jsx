// src/components/ui/Select.jsx
import React from 'react';

const SelectField = React.forwardRef(function SelectField(
  { label, options, error, id, name, ...rest },
  ref
) {
  const inputId = id || name;
  return (
    <div>
      <label htmlFor={inputId} className="block mb-1">
        {label}
      </label>
      <select
        id={inputId}
        name={name}
        ref={ref}             // <<< forward the ref here
        {...rest}             // onChange, onBlur, etc.
        className="w-full p-2 border rounded"
      >
        <option value="">Select a role</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

SelectField.displayName = 'SelectField';
export default SelectField;
