import { downloadAllFiles } from "@/lib/api";

const Result = ({ result }) => {
  const handleDownloadAll = async () => {
    if (Array.isArray(result.fileUrl)) {
      try {
        await downloadAllFiles(result.fileUrl); // Panggil fungsi dari api.js
      } catch (error) {
        alert("Failed to download all files. Please try again.");
      }
    }
  };

  const handleDownload = () => {
    if (Array.isArray(result.fileUrl)) {
      // Unduh semua file satu per satu (fallback jika ZIP tidak digunakan)
      result.fileUrl.forEach((url, index) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `processed-file-page-${index + 1}.jpg`;
        link.click();
      });
    } else {
      // Unduh file tunggal
      const link = document.createElement("a");
      link.href = result.fileUrl;
      link.download = "processed-file.pdf";
      link.click();
    }
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
          Click the button below to download your processed file.
        </p>

        {/* Tombol Unduh */}
        <div className="flex px-4 py-3 justify-center">
          <button
            onClick={handleDownloadAll}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#1978e5] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Download All Files</span>
          </button>
        </div>

        {/* Informasi Ukuran File */}
        <p className="text-[#4e7097] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          File size: {result.fileSize || "Unknown"} MB
        </p>

        {/* Jika fileUrl adalah array, tampilkan thumbnail */}
        {Array.isArray(result.fileUrl) && (
          <div className="mt-6">
            <h3 className="text-[#0e141b] text-lg font-bold leading-tight px-4 text-center pb-3">
              Thumbnails:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
              {result.fileUrl.map((url, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border border-gray-300 rounded-lg p-2 shadow-sm"
                >
                  <img
                    src={url}
                    alt={`Page ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="text-sm text-[#0e141b] font-medium mt-2">
                    Page {index + 1}
                  </p>
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `processed-file-page-${index + 1}.jpg`;
                      link.click();
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;