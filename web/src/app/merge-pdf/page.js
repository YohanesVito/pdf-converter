"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import MergePDF from "@/components/MergePDF";
import Loading from "@/components/Loading";
import Result from "@/components/Result";

export default function MergePDFPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null); // State untuk menyimpan hasil

  const handleStartProcessing = () => {
    setIsLoading(true);

    // Simulasikan proses (misalnya, panggilan API)
    setTimeout(() => {
      setIsLoading(false); // Selesai memproses
      setResult({
        fileUrl: "/path-to-your-file.pdf", // Ganti dengan URL file hasil
        fileSize: "2.5 MB", // Ganti dengan ukuran file hasil
      });
    }, 5000); // Simulasi waktu pemrosesan 5 detik
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Work Sans','Noto Sans',sans-serif]">
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Tampilkan Loading, Result, atau MergePDF berdasarkan status */}
            {isLoading ? (
              <Loading />
            ) : result ? (
              <Result result={result} />
            ) : (
              <MergePDF onStartProcessing={handleStartProcessing} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}