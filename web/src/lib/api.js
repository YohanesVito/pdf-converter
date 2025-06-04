import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL; // Gunakan variabel lingkungan untuk base URL

const apiClient = axios.create({
  baseURL: API_URL, // Gunakan variabel lingkungan untuk base URL
  timeout: 10000,
});

// Convert Image to PDF
export const convertImageToPdf = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert-image-to-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY
    },
    onUploadProgress,
  });

  return response.data;
};


// Convert PDF to Image
export const convertPdfToImage = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert-pdf-to-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
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
