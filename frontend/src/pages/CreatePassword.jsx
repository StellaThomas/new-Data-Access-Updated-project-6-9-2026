import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function CreatePassword() {

  const navigate = useNavigate();
  
const [customerId, setCustomerId] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreatePassword = async () => {

if (!customerId) {
  alert("Please Enter Customer ID");
  return;
}

if (isNaN(customerId)) {
  alert("Customer ID must be numeric");
  return;
}

   if (!username) {

  alert("Please Enter Username");

  return;

}

// if (username.includes(" ")) {
//   alert("Username should not contain spaces");
//   return;
// }/




if (!password) {

  alert("Please Enter Password");

  return;

}

    if (!confirmPassword) {

      alert("Please Enter Confirm Password");

      return;

    }

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    try {

      setLoading(true);

     const res = await axios.post(

  "http://localhost:5000/api/create-password",
  {
  customerId: customerId.trim(),
  username: username.trim(),
  password: password.trim(),
}
);

      if (res.data.success) {

      alert("Account Created Successfully");
        navigate("/");

      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to create password."
      );

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
      }}
    >

      <Paper
        elevation={15}
        sx={{
          width: 500,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            background:
              "linear-gradient(90deg,#1976d2,#42a5f5)",
            py: 5,
            textAlign: "center",
            color: "#fff",
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
  mt={2}
  fontWeight="bold"
>
  Create Account
</Typography>

        </Box>

        <Box p={4}>

<Typography
  fontWeight="bold"
  mb={1}
>
  Customer ID
</Typography>
<TextField
  fullWidth
  type="text"
  label="Customer ID"
  placeholder="Enter Customer ID"
  value={customerId}
  onChange={(e) => setCustomerId(e.target.value)}
  sx={{ mb: 3 }}
/>

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
            New Password
          </Typography>

         <TextField
  fullWidth
  label="Password"
  placeholder="Enter Password"
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  sx={{ mb: 3 }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

          <Typography
            fontWeight="bold"
            mb={1}
          >
            Confirm Password
          </Typography>

          <TextField
    fullWidth
    label="Confirm Password"
    placeholder="Confirm Password"
    type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            sx={{ mb: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">

                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
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
              py: 1.5,
              fontSize: 18,
              borderRadius: 5,
            }}
            onClick={handleCreatePassword}
            disabled={loading}
          >

            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "CREATE ACCOUNT"
            )}

          </Button>

        
        <Typography
  align="center"
  sx={{ mt: 3 }}
>
  Already have an account?
</Typography>

<Button
  fullWidth
  variant="text"
  onClick={() => navigate("/")}
>
  Login
</Button>





        </Box>

      </Paper>

    </Box>

  );

}

export default CreatePassword;