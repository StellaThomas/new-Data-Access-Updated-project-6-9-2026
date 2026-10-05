import React, { useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

function AccessData() {
  const [password, setPassword] = useState("");
  const [tables, setTables] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [recordCount, setRecordCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const handleAccess = async () => {
  try {
    setLoading(true);

   const response = await axios.post(
  `${API_URL}/api/access`,
  {
    password,
  }
);

    if (response.data.success) {

      console.log(
        "Tables Count =>",
        response.data.tables.length
      );

      console.log(
        "Tables =>",
        response.data.tables
      );

      setTables(
        response.data.tables
      );

      setMessage(
        "Database Connected Successfully"
      );

      setIsLoggedIn(true);
    }

  } catch (error) {

    setMessage(
      "Invalid Password"
    );

  } finally {

    setLoading(false);
  }
};



  const fetchTableData = async (table) => {
    try {
      setTableLoading(true);

      setSelectedTable(table);

      const response = await axios.get(
        `${API_URL}/api/table/${table}`,
      );

      console.log("API RESPONSE:", response.data);

      setTableData(response.data.data || []);
      setRecordCount(response.data.count || 0);
    } catch (error) {
      console.error(error);
      setTableData([]);
      setRecordCount(0);
    } finally {
      setTableLoading(false);
    }
  };

  const handleDownloadPDF = () => {
  if (!tableData.length) return;

  const doc = new jsPDF(
    "landscape",
    "mm",
    "a2"
  );




 
  // Title
  doc.setFontSize(20);
  doc.text("RCL Database Report", 14, 15);

  // Collection Info
  doc.setFontSize(12);
  doc.text(`Collection : ${selectedTable}`, 14, 25);
  doc.text(`Total Records : ${recordCount}`, 14, 32);

  doc.text(
    `Generated On : ${new Date().toLocaleDateString()}`,
    14,
    39
  );

  // Table Columns
  const tableColumns = columns.map(
    (col) => col.headerName
  );

  // Table Rows
  const tableRows = rows.map((row) =>
    columns.map(
      (col) => row[col.field] ?? ""
    )
  );

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,

    startY: 45,

    theme: "grid",

    styles: {
      fontSize: 6,
      cellPadding: 1.5,
      overflow: "hidden",
      halign: "left",
      valign: "middle",
    },

    headStyles: {
      fillColor: [25, 118, 210],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7,
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },

    margin: {
      left: 5,
      right: 5,
    },

    tableWidth: "auto",
  });



  doc.save(`${selectedTable}.pdf`);
};

  const columns =
    tableData.length > 0
      ? Object.keys(tableData[0])
          .filter((key) => key !== "_id")
          .map((key) => ({
            field: key,
            headerName: key,
            flex: 1,
            minWidth: 150,
          }))
      : [];

  const rows = tableData.map((row, index) => ({
    id: row._id || index,
    ...row,
  }));

  console.log("Columns =>", columns);
  console.log("Rows =>", rows);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
        p: 3,
      }}
    >
      {/* Login Card */}

      {!isLoggedIn && (
        <Paper
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 4,
            maxWidth: "700px",
            mx: "auto",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                width: 50,
                height: 50,
              }}
            >
              DB
            </Avatar>

            <Typography variant="h4" fontWeight="bold">
              RCL Database Portal
            </Typography>
          </Box>

          <TextField
            fullWidth
            type="password"
            label="MDB Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mt: 2,
            }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 3,
            }}
            onClick={handleAccess}
          >
            {loading ? <CircularProgress size={25} /> : "Connect Database"}
          </Button>

          <Typography
            mt={2}
            color={message.includes("Successfully") ? "green" : "red"}
          >
            {message}
          </Typography>
        </Paper>
      )}
      {isLoggedIn && (
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Sidebar */}

          <Paper
            elevation={5}
            sx={{
              width: 300,
              height: "calc(100vh - 100px)",
              borderRadius: 3,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              flexShrink: 0,
            }}
          >
            {/* Search Box */}

            <Box p={2}>
              <TextField
                size="small"
                fullWidth
                placeholder="Search Collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Box>

            {/* Header */}

            <Box
              sx={{
                background: "linear-gradient(90deg,#1976d2,#42a5f5)",
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Collections ({tables.length})
              </Typography>
            </Box>

            {/* Collection List */}

            <List
              sx={{
                flex: 1,
                overflowY: "scroll",
                p: 1,

                "&::-webkit-scrollbar": {
                  width: "6px",
                },

                "&::-webkit-scrollbar-thumb": {
                  background: "#1976d2",
                  borderRadius: "10px",
                },
              }}
            >
              {tables
                .filter((table) =>
                  table.toLowerCase().includes(search.toLowerCase()),
                )
                .map((table) => (
                  <ListItemButton
                    key={table}
                    selected={selectedTable === table}
                    onClick={() => fetchTableData(table)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,

                      "&.Mui-selected": {
                        backgroundColor: "#1976d2",
                        color: "#fff",

                        "&:hover": {
                          backgroundColor: "#1565c0",
                        },
                      },

                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                      },
                    }}
                  >
                    <ListItemText
                      primary={table}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: selectedTable === table ? 600 : 500,
                      }}
                    />
                  </ListItemButton>
                ))}
            </List>
          </Paper>

          {/* Data */}

          <Paper
            sx={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              height: "calc(100vh - 100px)",
              overflow: "hidden",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                p: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
            <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 2,
    flexWrap: "wrap",
  }}
>
  {/* Total Records */}

  <Typography
    variant="h6"
    color="primary"
    fontWeight="bold"
  >
    Total Records: {recordCount}
  </Typography>

  {/* Selected Table Name */}

  {selectedTable && (
   <Typography
  sx={{
    bgcolor: "#1976d2",
    color: "#fff",
    px: 2,
    py: 1,
    borderRadius: "20px",
    fontWeight: "bold",
  }}
>
  {selectedTable}
</Typography>
  )}

  {/* Download Button */}

  <Button
    variant="contained"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadPDF}
    disabled={!tableData.length}
    sx={{
      borderRadius: "30px",
      px: 3,
      fontWeight: "bold",

      background:
        "linear-gradient(90deg,#16a34a,#22c55e)",

      boxShadow:
        "0 4px 15px rgba(34,197,94,.4)",

      "&:hover": {
        background:
          "linear-gradient(90deg,#15803d,#16a34a)",
      },
    }}
  >
    Download PDF
  </Button>


<Button
  variant="contained"
  color="secondary"
  onClick={() =>
    navigate("/inward-report")
  }
  sx={{
    borderRadius: "30px",
    px: 3,
    fontWeight: "bold",
  }}
>
  Joined Inward Report
</Button>


</Box>

              <Divider sx={{ my: 2 }} />

              {tableLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "300px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : tableData.length > 0 ? (
                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    minHeight: 0,
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={tableLoading}
                    pagination
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    disableRowSelectionOnClick
                    sx={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                      borderRadius: 4,
                      backgroundColor: "#fff",

                      /* HEADER */

                      "& .MuiDataGrid-columnHeaders": {
                        background: "linear-gradient(90deg,#1976d2,#42a5f5)",
                        color: "#fff",
                        borderRadius: "12px 12px 0 0",
                        borderBottom: "none",
                      },

                      "& .MuiDataGrid-columnHeader": {
                        background: "linear-gradient(90deg,#1976d2,#42a5f5)",
                      },

                      "& .MuiDataGrid-columnHeaderTitle": {
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "14px",
                        textTransform: "capitalize",
                      },

                      "& .MuiDataGrid-iconSeparator": {
                        color: "rgba(255,255,255,0.4)",
                      },

                      "& .MuiDataGrid-sortIcon": {
                        color: "#fff",
                      },

                      "& .MuiDataGrid-menuIcon button": {
                        color: "#fff",
                      },

                      /* ROWS */

                      "& .MuiDataGrid-row": {
                        transition: "all 0.2s ease",
                      },

                      "& .MuiDataGrid-row:nth-of-type(even)": {
                        backgroundColor: "#f8fafc",
                      },

                      "& .MuiDataGrid-row:hover": {
                        backgroundColor: "#e3f2fd",
                        transform: "scale(1.001)",
                      },

                      "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #e5e7eb",
                        fontSize: "14px",
                        color: "#334155",
                      },

                      /* SELECTED ROW */

                      "& .Mui-selected": {
                        backgroundColor: "#bbdefb !important",
                      },

                      /* FOOTER */

                      "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#f8fafc",
                        borderTop: "1px solid #e5e7eb",
                      },

                      "& .MuiTablePagination-root": {
                        color: "#0f172a",
                        fontWeight: 600,
                      },

                      /* SCROLLBAR */

                      "& ::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                      },

                      "& ::-webkit-scrollbar-track": {
                        background: "#f1f5f9",
                      },

                      "& ::-webkit-scrollbar-thumb": {
                        background: "#1976d2",
                        borderRadius: "20px",
                      },

                      "& ::-webkit-scrollbar-thumb:hover": {
                        background: "#1565c0",
                      },

                      /* REMOVE FOCUS BORDER */

                      "& .MuiDataGrid-cell:focus": {
                        outline: "none",
                      },

                      "& .MuiDataGrid-columnHeader:focus": {
                        outline: "none",
                      },
                    }}
                  />
                </Box>
              ) : (
                <Typography align="center" color="text.secondary" mt={5}>
                  No Data Found
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default AccessData;





































































