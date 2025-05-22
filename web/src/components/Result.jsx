const Result = ({ result }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result.fileUrl; // URL file hasil
    link.download = "processed-file.pdf"; // Nama file yang diunduh
    link.click();
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Judul */}
        <h2 className="text-[#0e141b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Your file is ready!
        </h2>

        {/* Deskripsi */}
        <p className="text-[#0e141b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Click the button below to download your processed PDF file.
        </p>

        {/* Tombol Unduh */}
        <div className="flex px-4 py-3 justify-center">
          <button
            onClick={handleDownload}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#1978e5] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Download PDF</span>
          </button>
        </div>

        {/* Informasi Ukuran File */}
        <p className="text-[#4e7097] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          File size: {result.fileSize}
        </p>
      </div>
    </div>
  );
};

export default Result;