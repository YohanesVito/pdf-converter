// filepath: e:\pdf-converter\web\src\features\upload\UploadService.js
"use client";
import { API_URL } from "@lib/api";

export async function uploadFile(file, endpoint) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return response.json();
}