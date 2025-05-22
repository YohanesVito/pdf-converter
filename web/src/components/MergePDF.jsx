"use client";

import React, { useState } from "react";
const MergePDF = ({ onStartProcessing }) => {
  const handleMerge = () => {
    // Panggil fungsi untuk memulai proses
    if (onStartProcessing) {
      onStartProcessing();
    }

    // Tambahkan logika penggabungan file di sini
    console.log("Merging files...");
  };

const fileInputRef = React.useRef(null);

const handleChooseFile = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
};

const handleFileChange = (event) => {
    // Handle selected files here
    const files = event.target.files;
    console.log("Selected files:", files);
    // You can add logic to store files in state if needed
};

const [dragActive, setDragActive] = useState(false);

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
        handleFileChange({ target: { files } });
    }
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
            <div
                className={`flex flex-col items-center gap-6 rounded-lg border-2 border-dashed ${dragActive ? "border-blue-400 bg-blue-50" : "border-[#d0dbe7]"} px-6 py-14`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                    <p className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                        Drag and drop your PDFs here
                    </p>
                    <p className="text-[#0e141b] text-sm font-normal leading-normal max-w-[480px] text-center">
                        Or select files from your computer
                    </p>
                </div>
                <input
                    type="file"
                    accept="application/pdf"
                    multiple
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
            </div>
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