import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

function DatabaseDashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fc",
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          RCL Database Dashboard
        </Typography>

        <Chip
          label="Connected"
          color="success"
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
}

export default DatabaseDashboard;