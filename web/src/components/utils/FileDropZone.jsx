"use client";

import React, { useState, useRef } from "react";

const FileDropZone = ({ onFilesSelected, accept = "application/pdf", multiple = true }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Untuk menyimpan file yang dipilih
  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray); // Simpan file yang dipilih
      onFilesSelected(fileArray);
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray); // Simpan file yang dipilih
      onFilesSelected(fileArray);
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-lg border-2 border-dashed ${
        dragActive ? "border-blue-400 bg-blue-50" : "border-[#d0dbe7]"
      } px-6 py-14`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex max-w-[480px] flex-col items-center gap-2">
        <p className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
          Drag and drop your files here
        </p>
        <p className="text-[#0e141b] text-sm font-normal leading-normal max-w-[480px] text-center">
          Or select files from your computer
        </p>
      </div>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        onClick={handleChooseFile}
        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em]"
      >
        <span className="truncate">Choose File</span>
      </button>

      {/* Tampilkan nama file yang dipilih */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 w-full">
          <p className="text-[#0e141b] text-sm font-bold mb-2">Selected Files:</p>
          <ul className="list-disc list-inside text-[#0e141b] text-sm">
            {selectedFiles.map((file, index) => (
              <li key={index} className="truncate">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;