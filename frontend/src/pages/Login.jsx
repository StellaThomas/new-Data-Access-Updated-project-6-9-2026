import React, { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Avatar,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const handleLogin = () => {
  if (
    username === "admin" &&
    password === "admin123"
  ) {
    navigate("/access");
  } else {
    alert("Invalid Username or Password");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
      }}
    >
      <Paper
        elevation={15}
        sx={{
          width: 450,
          p: 5,
          borderRadius: 5,

          background:
            "rgba(255,255,255,0.95)",

          boxShadow:
            "0px 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            sx={{
              bgcolor: "#1976d2",
              width: 80,
              height: 80,
              mb: 2,
            }}
          >
            <LockOutlinedIcon
              sx={{ fontSize: 40 }}
            />
          </Avatar>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Welcome Back
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 4 }}
          >
             Admin Login
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
          sx={{
            py: 1.5,

            borderRadius: "30px",

            fontSize: "16px",

            fontWeight: "bold",

            background:
              "linear-gradient(90deg,#1976d2,#42a5f5)",

            boxShadow:
              "0px 5px 20px rgba(25,118,210,0.4)",

            "&:hover": {
              background:
                "linear-gradient(90deg,#1565c0,#1976d2)",
            },
          }}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;