// src/components/ui/Input.jsx
import React from 'react';

// src/components/ui/Input.jsx
const InputField = ({ label, error, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-1 font-medium">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className="border px-2 py-1 rounded"
          {...rest}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    );
  };
  
  // 👇 required for react-hook-form compatibility
  export default React.forwardRef(InputField);
  