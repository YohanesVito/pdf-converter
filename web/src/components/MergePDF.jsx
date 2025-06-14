"use client";

import React, { useState } from "react";
import FileDropZone from "./utils/FileDropZone";

const MergePDF = ({ onStartProcessing }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Untuk menyimpan file yang dipilih

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    console.log("Selected files:", files);
  };

  const handleMerge = () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to merge.");
      return;
    }
    if (onStartProcessing) {
      onStartProcessing();
    }
    console.log("Merging files:", selectedFiles);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight">Merge PDF</p>
          <p className="text-[#4e7097] text-sm font-normal leading-normal">
            Combine multiple PDF files into one. Upload your files to get started.
          </p>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <FileDropZone onFilesSelected={handleFilesSelected} accept="application/pdf" multiple />
      </div>
      <div className="flex px-4 py-3 justify-center">
        <button
          onClick={handleMerge}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1978e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Merge</span>
        </button>
      </div>
    </div>
  );
};

export default MergePDF;