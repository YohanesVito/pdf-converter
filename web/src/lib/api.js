import axios from "axios";

export const API_URL = "http://localhost:8001"; // Ganti dengan URL API Anda
// export const API_URL = "https://api.tools.tugra-dev.my.id";

const apiClient = axios.create({
  baseURL: API_URL, // Gunakan variabel lingkungan untuk base URL
  timeout: 10000,
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

// Delete temporary files
export const deleteTempFiles = async (fileUrls) => {
  try {
    await apiClient.post("/delete-temp-files", { file_urls: fileUrls });
  } catch (error) {
    console.error("Error deleting temporary files:", error);
    throw error;
  }
};
