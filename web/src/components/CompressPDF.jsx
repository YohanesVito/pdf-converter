"use client";

import React, { useState } from "react";
import FileDropZone from "./utils/FileDropZone";

const CompressPDF = ({ onStartProcessing }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Untuk menyimpan file yang dipilih

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    console.log("Selected files:", files);
  };

  const handleCompress = () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to compress.");
      return;
    }
    if (onStartProcessing) {
      onStartProcessing();
    }
    console.log("Compressing files:", selectedFiles);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight">Compress PDF</p>
          <p className="text-[#4e7097] text-sm font-normal leading-normal">
            Reduce the size of your PDF files without losing quality. Upload your files to get started!.
          </p>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <FileDropZone onFilesSelected={handleFilesSelected} accept="application/pdf" multiple />
      </div>
      <div className="flex px-4 py-3 justify-center">
        <button
          onClick={handleCompress}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1978e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Compress</span>
        </button>
      </div>
    </div>
  );
};

export default CompressPDF;