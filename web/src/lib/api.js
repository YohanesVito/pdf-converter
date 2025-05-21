import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL, // Gunakan variabel lingkungan untuk base URL
});

export const convertToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert-to-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

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