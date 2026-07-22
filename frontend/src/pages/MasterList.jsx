
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
 
  Button,
  CircularProgress,
  
} from "@mui/material";


import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

function MasterList() {

  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer") || "{}"
  );

  const customerId = customer?.CustomerID;

  const [loading, setLoading] = useState(false);

  // Initialized with empty array to prevent undefined map errors
  const [rows, setRows] = useState([]);

 const loadMasterList = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      `http://localhost:5000/api/master-list?customerId=${customerId}`
    );

    console.log("========== Response ==========");
    console.log(res);
    console.log(res.data);

    // API मधून आलेला data
  const data = res.data?.data || [];

console.log("Master Records :", data.length);

console.log("========== First 20 Records ==========");
console.table(
  data.slice(0, 20).map((item, index) => ({
    SrNo: index + 1,
    InwardNo: item.InwardNo,
    InwardDate: item.InwardDate,
    LABIDNo: item.LABIDNo,
    Description: item.Description,
    GaugeIDNo: item.GaugeIDNo,

    // Size / Range / L.C.
    GIRangeFrom: item.GIRangeFrom,
    GIRangeTo: item.GIRangeTo,
    GIRangeUnit: item.GIRangeUnit,

    GILC: item.GILC,
    GILCUnit: item.GILCUnit,

    STDSpecification: item.STDSpecification,

    GoSize: item.GoSize,
    NoGoSize: item.NoGoSize,
    SizeUnit: item.SizeUnit,

    // Dates
    CalibratedOn: item.CalibratedOn,
    NextDueOn: item.NextDueOn
  }))
);

setRows(data);
   

   

    // Table मध्ये data दाखवण्यासाठी
    setRows(data);

  } catch (err) {

    console.error("Error loading master list:", err);

  } finally {

    setLoading(false);

  }
};

  useEffect(()=>{
    if(customerId){
        loadMasterList();
    }
  }, [customerId]);

  // Robust filter logic with optional chaining


const filteredRows = rows;



  const formatDate = (date) => {
    if(!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
  };


  const getSizeRange = (item) => {

  const type = (item.Description || "").toUpperCase();

  // -----------------------------
  // 1. GO / NO GO Gauges
  // -----------------------------
  if (
    type.includes("PLUG GAUGE") ||
    type.includes("WIDTH GAUGE") ||
    type.includes("SNAP GAUGE") ||
    type.includes("PIN TYPE SNAP") ||
    type.includes("FLUSH PIN") ||
    type.includes("PADDLE") ||
    type.includes("PLUG CUM DEPTH") ||
    type.includes("PLUG CUM WIDTH") ||
    type.includes("BALL PLUG")
  ) {
    return `Go : ${item.GoSize || "-"} mm
No Go : ${item.NoGoSize || "-"} mm`;
  }

  // -----------------------------
  // 2. Size Only
  // -----------------------------
  if (
    type.includes("RING GAUGE") ||
    type.includes("SETTING MASTER") ||
    type.includes("SETTING MASTER (ID)") ||
    type.includes("SETTING MASTER (OD)") ||
    type.includes("SETTING MASTER (PLUG)") ||
    type.includes("SETTING MASTER (SPECIAL") ||
    type.includes("MICROMETER SETTING MASTER") ||
    type.includes("CYLINDRICAL SETTING MASTER") ||
    type.includes("HEIGHT BLOCK") ||
    type.includes("HEIGHT MASTER") ||
    type.includes("OD MASTER") ||
    type.includes("O. D. MASTER") ||
    type.includes("PIN GAUGE")
  ) {
    return `Size : ${item.STDSpecification || "-"}`;
  }

  // -----------------------------
  // 3. Plunger / Lever Dial
  // -----------------------------
  if (
    type.includes("PLUNGER DIAL") ||
    type.includes("LEVER DIAL")
  ) {
    return `Range : ${item.STDSpecification || "-"} mm
L.C : ${item.GILC || "-"} mm`;
  }

  // -----------------------------
  // 4. Bore / Dial Comparator
  // -----------------------------
  if (
    type.includes("BORE GAUGE") ||
    type.includes("SNAP DIAL") ||
    type.includes("DIAL SNAP") ||
    type.includes("INTERNAL DIAL") ||
    type.includes("INT. DIAL") ||
    type.includes("DIAL COMP")
  ) {
    return `Range : ${item.STDSpecification || "-"} mm
L.C : ${item.GILC || "-"} mm`;
  }

  // -----------------------------
  // 5. Vernier / Micrometer
  // -----------------------------
  if (
    type.includes("VERNIER") ||
    type.includes("CALIPER") ||
    type.includes("MICROMETER") ||
    type.includes("DIGITAL") ||
    type.includes("HEIGHT GAUGE") ||
    type.includes("DEPTH GAUGE") ||
    type.includes("INSIDE CALIPER")
  ) {
    return `Range : ${item.STDSpecification || "-"} mm
L.C : ${item.GILC || "-"} mm`;
  }

  // -----------------------------
  // 6. Thread Gauges
  // -----------------------------
  if (
    type.includes("THREAD PLUG") ||
    type.includes("TAPER THREAD") ||
    type.includes("THREAD CUM") ||
    type.includes("THREAD")
  ) {
    return `Size : ${item.STDSpecification || "-"}`;
  }

  // -----------------------------
  // Default
  // -----------------------------
  return `Range : ${item.GIRangeFrom || "-"} - ${item.GIRangeTo || "-"} mm
L.C : ${item.GILC || "-"} mm`;
};


  return (
<Box
sx={{
background:"#edf3ff",
minHeight:"100vh",
p:2
}}
>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
       

       <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mt={3}
    mb={3}
>

    <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dashboard")}
    >
        Back
    </Button>

    <Typography
        variant="h4"
        fontWeight="bold"
        color="#1565c0"
    >
        MASTER LIST OF INSTRUMENTS & GAUGES
    </Typography>

    <Box width={100}></Box>

</Box>

<Typography
    sx={{
        fontWeight:600,
        fontSize:18,
        mb:2
    }}
>
    Customer : {customer?.Customer}
</Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
         <TableContainer
component={Paper}
variant="outlined"
sx={{
maxHeight:"75vh"
}}
>
           <Table
size="small"
>
             <TableHead>
  <TableRow
    sx={{
      backgroundColor: "#ffffff",
    }}
  >
    <TableCell
      sx={{
        width: "60px",
        py: 1,
        px: 1,
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      <strong>Sr No</strong>
    </TableCell>

    <TableCell
      sx={{
        width: "260px",
        py: 1,
        px: 1,
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      <strong>Description</strong>
    </TableCell>

    <TableCell
      sx={{
        width: "170px",
        py: 1,
        px: 1,
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      <strong>Code No</strong>
    </TableCell>

    <TableCell
      sx={{
        width: "240px",
        py: 1,
        px: 1,
        fontWeight: "bold",
        fontSize: "15px",
        whiteSpace: "nowrap",
      }}
    >
      <strong>Size / Range / L.C.</strong>
    </TableCell>

    <TableCell
      sx={{
        width: "140px",
        py: 1,
        px: 1,
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      <strong>Calibrated On</strong>
    </TableCell>

    <TableCell
      sx={{
        width: "140px",
        py: 1,
        px: 1,
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      <strong>Calibration Due</strong>
    </TableCell>

    <TableCell
      sx={{
        width: "70px",
        py: 1,
        px: 1,
        fontWeight: "bold",
        fontSize: "15px",
        textAlign: "center",
      }}
    >
      <strong>Remark</strong>
    </TableCell>
  </TableRow>
</TableHead>
             <TableBody>
  {filteredRows.length > 0 ? (
    filteredRows.map((item, index) => (
      <TableRow
key={`${item.GaugeIDNo}-${item.InwardNo}-${item.InwardDate}`}
sx={{
height:34
}}
>

        {/* Sr No */}
        <TableCell
sx={{
py:0.5,
px:1
}}
>{index + 1}</TableCell>

        {/* Description */}
        <TableCell
sx={{
py:0.5,
px:1
}}
>{item.Description || "-"}</TableCell>

        {/* Code No */}
        <TableCell
sx={{
py:0.5,
px:1
}}
>{item.GaugeIDNo || "-"}</TableCell>

        {/* Size / Range / L.C */}

     <TableCell
  sx={{
    padding: "6px",
    whiteSpace: "pre-line"
  }}
>
  {getSizeRange(item)}
</TableCell>

        {/* Calibrated On */}
        <TableCell
sx={{
padding:"8px"
}}
>
          {formatDate(item.CalibratedOn)}
        </TableCell>

        {/* Calibration Due */}
        <TableCell>
          {formatDate(item.NextDueOn)}
        </TableCell>

        {/* Remark */}
        <TableCell></TableCell>

      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} align="center">
        No Records Found
      </TableCell>
    </TableRow>
  )}
</TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}

export default MasterList;