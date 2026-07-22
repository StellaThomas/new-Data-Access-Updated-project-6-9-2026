

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Avatar,
  TextField,
  CircularProgress
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";





function Login() {

  const navigate = useNavigate();




const [username, setUsername] = useState("");

const [password, setPassword] = useState("");


const [loading, setLoading] = useState(false);

const [showPassword, setShowPassword] = useState(false);



const handleLogin = async () => {

  // Customer validation
  if (!username) {
    alert("Please Enter Username");
    return;
  }

  // Password validation
  if (!password) {
    alert("Please Enter Password");
    return;
  }

  try {

    setLoading(true);

   const res = await axios.post(
    "http://localhost:5000/api/login",
    {
        username: username.trim(),
        password: password.trim()
    }
);



   if (res.data.success) {

  localStorage.setItem(
    "customer",
    JSON.stringify(res.data.customer)
  );

  alert("Login Successful");

  navigate("/dashboard");

} else {

      alert(res.data.message);

    }

  } catch (err) {

    console.log("Login Error:", err);

    if (err.response) {

      alert(
        err.response.data.message ||
        "Invalid Username or Password"
      );

    } else {

      alert("Unable to connect to server.");

    }

  } finally {

    setLoading(false);

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
        "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      p: 3,
    }}
  >
    <Paper
      elevation={15}
      sx={{
        width: 450,
        borderRadius: 5,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          background:
            "linear-gradient(90deg,#1976d2,#42a5f5)",
          color: "#fff",
          textAlign: "center",
          py: 5,
        }}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            margin: "auto",
            bgcolor: "#fff",
            color: "#1976d2",
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 45 }} />
        </Avatar>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={2}
        >
          Customer Portal
        </Typography>

        <Typography>
          Calibration Management System
        </Typography>
      </Box>

      {/* Body */}

      <Box p={4}>

       

     <Typography
  fontWeight="bold"
  mb={1}
>
  Username
</Typography>

<TextField
  fullWidth
  label="Username"
  placeholder="Enter Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  sx={{ mb: 3 }}
/>

        <Typography
          fontWeight="bold"
          mb={1}
        >
          Password
        </Typography>

      <TextField
  fullWidth
  label="Password"
  placeholder="Enter Password"
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  autoComplete="off"
  sx={{
    mb: 2,
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
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
/>



      <Button
  fullWidth
  variant="contained"
  sx={{
    mt: 4,
    py: 1.5,
    fontSize: 18,
    borderRadius: 5,
  }}
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? (
    <CircularProgress
      size={24}
      sx={{ color: "#fff" }}
    />
  ) : (
    "LOGIN"
  )}
</Button>

<Typography
  align="center"
  sx={{ mt: 3 }}
>
  Don't have an account?
</Typography>

<Button
  fullWidth
  variant="text"
  sx={{ mt: 1 }}
  onClick={() => navigate("/create-password")}
>
  CREATE ACCOUNT
</Button>

<Typography
  textAlign="center"
  mt={4}
  color="gray"
  fontSize={14}
>
  © 2026 RCL Calibration Management System
</Typography>

              

      </Box>
    </Paper>
  </Box>
  );
}

export default Login;