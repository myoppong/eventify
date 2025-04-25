import React from "react";

const TextArea = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="mb-4">
    {label && <label className="block mb-1">{label}</label>}
    <textarea
      ref={ref}
      {...props}
      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

export default TextArea;
