"use client";

import { useState } from "react";
import FileDropZone from "./utils/FileDropZone";
import { convertImageToPdf, convertPdfToImage } from "@/lib/api";
import Loading from "./Loading";
import Result from "./Result";

const ConvertImagePDF = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Untuk menyimpan file yang dipilih
  const [tab, setTab] = useState("imageToPdf"); // Tambahkan state untuk tab aktif
  const [isLoading, setIsLoading] = useState(false); // Untuk mengelola status loading
  const [result, setResult] = useState(null); // Untuk menyimpan hasil konversi

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    console.log("Selected files:", files);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to convert.");
      return;
    }

    setIsLoading(true); // Set loading ke true
    setResult(null); // Reset hasil sebelumnya

    try {
      let response;
      if (tab === "imageToPdf") {
        // Panggil API untuk mengonversi gambar ke PDF
        response = await convertImageToPdf(selectedFiles[0]);
      } else if (tab === "pdfToImage") {
        // Panggil API untuk mengonversi PDF ke gambar
        response = await convertPdfToImage(selectedFiles[0]);
      }

      console.log("Server response:", response); // Tambahkan log untuk memeriksa respons

      // Handling untuk single-page dan multi-page PDF
      if (tab === "pdfToImage") {
        if (response.url) {
          // Single-page PDF
          setResult({
            fileUrl: [response.url], // Bungkus dalam array untuk konsistensi
            isMultiPage: false,
          });
        } else if (response.images) {
          // Multi-page PDF
          setResult({
            fileUrl: response.images,
            isMultiPage: true,
          });
        } else {
          throw new Error("Invalid response from server.");
        }
      } else if (tab === "imageToPdf" && response.url) {
        setResult({
          fileUrl: response.url,
          isMultiPage: false,
        });
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Error during conversion:", error);
      console.log("Error during conversion:", error);
      alert("Failed to convert file. Please try again.");
    } finally {
      setIsLoading(false); // Set loading ke false
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (result) {
    return <Result result={result} />;
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight">
              Convert PDF
            </p>
            <p className="text-[#5c718a] text-sm font-normal leading-normal">
              Convert your PDF files to images or images to PDF.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pb-3">
          <div className="flex border-b border-[#d4dbe2] px-4 gap-8">
            <button
              type="button"
              className={`flex flex-col items-center justify-center border-b-[3px] ${
                tab === "imageToPdf"
                  ? "border-b-[#b2cae5] text-[#101418]"
                  : "border-b-transparent text-[#5c718a]"
              } pb-[13px] pt-4 bg-transparent`}
              onClick={() => setTab("imageToPdf")}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Image to PDF
              </p>
            </button>
            <button
              type="button"
              className={`flex flex-col items-center justify-center border-b-[3px] ${
                tab === "pdfToImage"
                  ? "border-b-[#b2cae5] text-[#101418]"
                  : "border-b-transparent text-[#5c718a]"
              } pb-[13px] pt-4 bg-transparent`}
              onClick={() => setTab("pdfToImage")}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                PDF to Image
              </p>
            </button>
          </div>
        </div>

        {/* Drag and Drop Section */}
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
            disabled={isLoading}
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 ${
              isLoading ? "bg-gray-400" : "bg-[#b2cae5]"
            } text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]`}
          >
            <span className="truncate">
              {tab === "imageToPdf" ? "Convert to PDF" : "Convert to Images"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertImagePDF;