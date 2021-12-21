import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingCircularProgress() {
  return (
    <Box
      className="loading"
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 20,
      }}
    >
      <CircularProgress size={100} color="error" />
    </Box>
  );
}

export default LoadingCircularProgress;