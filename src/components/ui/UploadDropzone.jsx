import React, { useRef } from "react";

export default function UploadDropzone({ onFileSelect, accept = "image/*" }) {
  const inputRef = useRef();

  const handleFiles = (files) => {
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      className="border-2 border-dashed p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-center"
      onClick={() => inputRef.current.click()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept={accept}
        ref={inputRef}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p>Click or drag file to upload</p>
    </div>
  );
}
