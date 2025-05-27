import React from "react";
import { Button } from "@mui/material";

const ResultDisplay = ({ result }) => {
  if (!result || !result.url) return null;

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        component="a"
        href={result.url}
        download
      >
        Download Result
      </Button>
    </div>
  );
};

export default ResultDisplay;