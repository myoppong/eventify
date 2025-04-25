// src/components/ui/FileUpload.jsx
import React from "react";

const FileUpload = ({ label, accept, onChange, hint }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <input
      type="file"
      accept={accept}
      onChange={onChange}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
);

export default FileUpload;
