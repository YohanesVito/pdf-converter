import JSZip from "jszip";
import { deleteTempFiles } from "@/lib/api";

const Result = ({ result, tab }) => {
  const handleDeleteTempFiles = async () => {
    try {
      const fileUrls = Array.isArray(result.fileUrl)
        ? result.fileUrl
        : [result.fileUrl];

      await deleteTempFiles(fileUrls);
      console.log("Temporary files deleted successfully.");
    } catch (error) {
      console.error("Failed to delete temporary files:", error);
    }
  };

  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    link.href = result.fileUrl;
    link.download = "converted-file.pdf";
    link.click();

    setTimeout(() => {
      handleDeleteTempFiles();
    }, 2000); // delay 2 detik
  };

  const handleDownloadImages = () => {
    result.fileUrl.forEach((url, index) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `page-${index + 1}.jpg`;
      link.click();
    });

    setTimeout(() => {
      handleDeleteTempFiles();
    }, 2000); // delay 2 detik
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();

    // Tambahkan file ke dalam ZIP
    result.fileUrl.forEach((url, index) => {
      zip.file(`page-${index + 1}.jpg`, url.split(",")[1], { base64: true });
    });

    // Buat ZIP dan trigger download
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "converted-images.zip";
    link.click();

    // Tunggu sedikit sebelum delete (biar browser sempat mulai download)
    setTimeout(async () => {
      try {
        const fileUrls = Array.isArray(result.fileUrl)
          ? result.fileUrl
          : [result.fileUrl];
        await deleteTempFiles(fileUrls);
        console.log("Temporary files deleted successfully.");
      } catch (error) {
        console.error("Failed to delete temporary files:", error);
      }
    }, 2000); // delay 2 detik
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[#0e141b] text-[28px] font-bold text-center pb-3 pt-5">
          Your file is ready!
        </h2>
        <p className="text-[#0e141b] text-base text-center px-4">
          Click the button below to download your processed file.
        </p>

        {tab === "imageToPdf" && (
          <div className="flex justify-center py-4">
            <button
              onClick={handleDownloadPdf}
              className="h-12 px-5 bg-[#1978e5] text-white font-bold rounded-lg cursor-pointer"
            >
              Download PDF
            </button>
          </div>
        )}

        {tab === "pdfToImage" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <button
              onClick={handleDownloadImages}
              className="h-12 px-5 bg-[#1978e5] text-white font-bold rounded-lg cursor-pointer"
            >
              Download Single Files
            </button>
            <button
              onClick={handleDownloadZip}
              className="h-12 px-5 bg-[#1978e5] text-white font-bold rounded-lg cursor-pointer"
            >
              Download as ZIP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;