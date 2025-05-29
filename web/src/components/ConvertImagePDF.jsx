// ConvertImagePDF.jsx
"use client";

import { useState } from "react";
import FileDropZone from "./utils/FileDropZone";
import { convertImageToPdf, convertPdfToImage } from "@/lib/api";
import Loading from "./Loading";
import Result from "./Result";

const ConvertImagePDF = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tab, setTab] = useState("imageToPdf");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [result, setResult] = useState(null);

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to convert.");
      return;
    }

    setStatus("loading");
    setResult(null);

    try {
      let response;

      if (tab === "imageToPdf") {
        response = await convertImageToPdf(selectedFiles[0]);
        if (response.url) {
          setResult({ fileUrl: response.url });
        } else {
          throw new Error("Invalid response from server.");
        }
      } else if (tab === "pdfToImage") {
        response = await convertPdfToImage(selectedFiles[0]);
        if (response.url) {
          setResult({ fileUrl: [response.url] });
        } else if (response.images) {
          setResult({ fileUrl: response.images });
        } else {
          throw new Error("Invalid response from server.");
        }
      }

      setStatus("success");
    } catch (error) {
      console.error("Error during conversion:", error);
      alert("Failed to convert file. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "loading") return <Loading />;
  if (status === "success" && result) return <Result result={result} tab={tab} />;

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#101418] text-[32px] font-bold">Convert PDF</p>
            <p className="text-[#5c718a] text-sm">Convert your PDF files to images or images to PDF.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="pb-3">
          <div className="flex border-b px-4 gap-8 border-[#d4dbe2]">
            {["imageToPdf", "pdfToImage"].map((type) => (
              <button
                key={type}
                className={`flex flex-col items-center border-b-[3px] pb-[13px] pt-4 ${
                  tab === type ? "border-[#b2cae5] text-[#101418]" : "border-transparent text-[#5c718a]"
                }`}
                onClick={() => {
                  setTab(type);
                  setResult(null);
                  setSelectedFiles([]);
                  setStatus("idle");
                }}
              >
                <p className="text-sm font-bold cursor-pointer">
                  {type === "imageToPdf" ? "Image to PDF" : "PDF to Image"}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Dropzone */}
        <div className="flex flex-col p-4">
          <FileDropZone
            onFilesSelected={handleFilesSelected}
            accept={tab === "imageToPdf" ? "image/*" : "application/pdf"}
            multiple={tab === "imageToPdf"}
          />
        </div>

        {/* Convert Button */}
        <div className="flex px-4 py-3 justify-end">
          <button
            onClick={handleConvert}
            className="flex items-center justify-center rounded-full h-10 px-4 text-sm font-bold bg-[#b2cae5] text-[#101418] cursor-pointer"
          >
            {tab === "imageToPdf" ? "Convert to PDF" : "Convert to Images"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertImagePDF;