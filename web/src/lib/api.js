import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL, // Gunakan variabel lingkungan untuk base URL
});

// Convert Image to PDF
export const convertImageToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert-image-to-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Convert PDF to Image
export const convertPdfToImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert-pdf-to-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Convert Word to PDF
export const convertWordToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert-word-to-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Convert PDF to Word
export const convertPdfToWord = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert-pdf-to-word", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Compress PDF
export const compressPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/compress-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Merge PDFs
export const mergePdfs = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await apiClient.post("/merge-pdfs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const downloadAllFiles = async (fileUrls) => {
  try {
    // Panggil endpoint untuk membuat file ZIP
    const response = await fetch(`${API_URL}/create-zip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_urls: fileUrls }),
    });

    if (!response.ok) {
      throw new Error("Failed to create ZIP file");
    }

    // Unduh file ZIP
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "processed_files.zip";
    link.click();

    // Hapus file sementara setelah unduhan selesai
    await fetch(`${API_URL}/delete-temp-files`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_urls: fileUrls }),
    });
  } catch (error) {
    console.error("Error downloading all files:", error);
    throw error;
  }
};
