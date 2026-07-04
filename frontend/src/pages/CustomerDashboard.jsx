import React from "react";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

function CustomerDashboard() {

  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        p: 4
      }}
    >

      <Paper
        sx={{
          p: 4,
          borderRadius: 4
        }}
      >

        <Box
          display="flex"
          alignItems="center"
          mb={4}
        >

          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: "#1976d2",
              mr: 2
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>

          <Box>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Welcome
            </Typography>

            <Typography
              variant="h5"
              color="primary"
            >
              {customer?.Customer}
            </Typography>

          </Box>

        </Box>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>

            <Card>

              <CardContent>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                >
                  Customer Information
                </Typography>

                <Typography>

                  <b>Customer ID :</b>

                  {" "}

                  {customer?.CustomerID}

                </Typography>

                <Typography>

                  <b>Customer :</b>

                  {" "}

                  {customer?.Customer}

                </Typography>

                <Typography>

                  <b>Address :</b>

                  {" "}

                  {customer?.Address || "-"}

                </Typography>

                <Typography>

                  <b>City :</b>

                  {" "}

                  {customer?.City || "-"}

                </Typography>

                <Typography>

                  <b>Phone :</b>

                  {" "}

                  {customer?.Phone || "-"}

                </Typography>

                <Typography>

                  <b>Email :</b>

                  {" "}

                  {customer?.Email || "-"}

                </Typography>

                <Typography>

                  <b>GST :</b>

                  {" "}

                  {customer?.GSTNo || "-"}

                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid item xs={12} md={6}>

            <Grid container spacing={2}>

              <Grid item xs={12}>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<HistoryIcon />}
                  sx={{
                    py: 2
                  }}
                  onClick={() =>
                    navigate("/history-card")
                  }
                >
                  History Card
                </Button>

              </Grid>

              <Grid item xs={12}>

                {/* <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  startIcon={<PictureAsPdfIcon />}
                  sx={{
                    py: 2
                  }}
                  onClick={() =>
                    navigate("/certificates")
                  }
                >
                  Certificates
                </Button> */}

              </Grid>

              <Grid item xs={12}>

                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<LogoutIcon />}
                  sx={{
                    py: 2
                  }}
                  onClick={logout}
                >
                  Logout
                </Button>

              </Grid>

            </Grid>

          </Grid>

        </Grid>

      </Paper>

    </Box>

  );

}

export default CustomerDashboard;