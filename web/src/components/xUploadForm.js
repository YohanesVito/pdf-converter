"use client";

import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import ResultDisplay from "./xResultDisplay";
import { convertToPdf, compressPdf, mergePdfs } from "../lib/api"; // Import fungsi API

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleConvert = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await convertToPdf(files[0]); // Gunakan fungsi API
      setResult(response);
    } catch (err) {
      setError(err.message || "Failed to convert file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompress = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await compressPdf(files[0]); // Gunakan fungsi API
      setResult(response);
    } catch (err) {
      setError(err.message || "Failed to compress file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMerge = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await mergePdfs(files); // Gunakan fungsi API
      setResult(response);
    } catch (err) {
      setError(err.message || "Failed to merge files");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<Box className="upload-form-container">
      <Typography variant="h4" gutterBottom>
        PDF Converter
      </Typography>
      <TextField
        type="file"
        inputProps={{ multiple: true }}
        onChange={handleFileChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          disabled={isLoading}
        >
          {isLoading ? "Converting..." : "Convert to PDF"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCompress}
          disabled={isLoading}
        >
          {isLoading ? "Compressing..." : "Compress PDF"}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleMerge}
          disabled={isLoading}
        >
          {isLoading ? "Merging..." : "Merge PDFs"}
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {result && <ResultDisplay result={result} />}
    </Box>
  );
};

export default UploadForm;