
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  TableContainer
} from "@mui/material";

function HistoryCard() {
  const navigate = useNavigate();

  // 1. All Hooks MUST be at the top level, before any conditional returns
  const [gaugeNo, setGaugeNo] = useState("");
const [header, setHeader] = useState(null);


const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [gaugeList, setGaugeList] = useState([]);

  // 2. Perform the logic check after the Hooks have initialized
  const customerData = localStorage.getItem("customer");
  const customer = customerData ? JSON.parse(customerData) : {};


   const customerId = customer.CustomerID;

//     const loadGaugeList = async () => {

//   try {

//     const res = await axios.get(
//       `http://localhost:5000/api/history-gauges?customerId=${customerId}`
//     );

//     setGaugeList(res.data.data);

//   } catch (err) {

//     console.log(err);

//   }

// };



// useEffect(() => {

//   loadGaugeList();

// }, []);


  if (!customer.CustomerID) {
    navigate("/");
    return null;
  }


  const loadHistory = async () => {


  console.log("Search Button Clicked");
  console.log("Gauge =", gaugeNo);
  console.log("Customer =", customerId);

    if (!gaugeNo.trim()) {
      alert("Please Enter Gauge Code");
      return;
    }

    setLoading(true);

  try {

  console.log("Calling API...");

  const res = await axios.get(
    `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${gaugeNo.trim()}`
  );

  console.log("API Response =", res);
  console.log("Success =", res.data.success);
 console.log("Header =", res.data.header);

console.log("History =", res.data.history);

console.log("History Count =", res.data.history?.length);

 if (!res.data.success) {

   setHeader(null);

   setHistory([]);

   alert("No History Found");

   return;

}

setHeader(res.data.header || null);

setHistory(res.data.history || []);



} catch (err) {

  console.log("========== ERROR ==========");
  console.log(err);

  if (err.response) {
    console.log("Status =", err.response.status);
    console.log("Response =", err.response.data);
  } else {
    console.log("Message =", err.message);
  }

 setHeader(null);
setHistory([]);

  alert(
    err.response?.data?.message ||
    "Unable to Load History"
  );
} finally {
      setLoading(false);
    }
  };


   
        const giType = header?.GITypeInfo?.GIType?.trim().toUpperCase() || "";

     const isPlugGauge =
  giType.includes("PLUG GAUGE") ||
  giType.includes("WIDTH GAUGE") ||
  giType.includes("SNAP GAUGE") ||
  giType.includes("FLUSH PIN GAUGE") ||
  giType.includes("PADDLE GAUGE");


/* ===================== RING GAUGE ===================== */

const isRingGauge =
  giType.includes("RING GAUGE") ||
  giType.includes("SETTING MASTER ID") ||
  giType.includes("SETTING MASTER OD") ||
  giType.includes("HEIGHT BLOCK") ||
  giType.includes("SETTING MASTER PLUG") ||
  giType.includes("OD MASTER") ||
  giType.includes("MICROMETER SETTING MASTER") ||
  giType.includes("PIN GAUGE");


/* ===================== PLUNGER DIAL ===================== */

const isPlungerDial =
  giType.includes("PLUNGER DIAL") ||
  giType.includes("LEVER DIAL");


/* ===================== BORE GAUGE ===================== */

const isBoreGauge =
  giType.includes("BORE GAUGE") ||
  giType.includes("DIAL SNAP GAUGE") ||
  giType.includes("INTERNAL DIAL COMPARATOR") ||
  giType.includes("INTERNAL DIAL COMPARATOR GAUGE");


/* ===================== VERNIER ===================== */

const isVernier =
  giType.includes("VERNIER CALLIPER") ||
  giType.includes("MICROMETER") ||
  giType.includes("MICROMETERS") ||
  giType.includes("DIGITAL CALIPER") ||
  giType.includes("DIGITAL DEPTH GAUGE") ||
  giType.includes("DIGITAL HEIGHT GAUGE") ||
  giType.includes("VERNIER HEIGHT GAUGE") ||
  giType.includes("VERNIER DEPTH GAUGE");


/* ===================== THREAD GAUGE ===================== */

const isThreadGauge =
  giType.includes("THREAD PLUG GAUGE") ||
  giType.includes("TAPER THREAD GAUGE");

  
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const openPdf = (item) => {
    if (!item.CalCertificateNo) {
      alert("PDF Not Available");
      return;
    }

    const fileName = item.CalCertificateNo.replace(/\//g, "-");

    window.open(
      `http://localhost:5000/certificates/${fileName}.pdf`,
      "_blank"
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        p: 4
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3
        }}
      >



<Box
  sx={{
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    mb: 4,
  }}
>

  {/* LEFT */}
  <Box>
    <Typography
      sx={{
        fontSize: "22px",
        fontWeight: "bold",
        color: "#000",
      }}
    >
      {header?.CustomerInfo?.Customer || customer.Customer}
    </Typography>

    <Typography
      sx={{
        fontSize: "15px",
        color: "#444",
        mt: 0.5,
      }}
    >
      {header?.CustomerInfo?.Address || ""}
      {header?.CustomerInfo?.City
        ? `, ${header.CustomerInfo.City}`
        : ""}
    </Typography>
  </Box>

  {/* CENTER */}
 

</Box>

        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} md={8}>

<TextField
  fullWidth
  label="Gauge Code No"
  placeholder="Enter Gauge Code"
  value={gaugeNo}
  onChange={(e) => setGaugeNo(e.target.value)}
/>

          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: 56,
                fontSize: 18,
                fontWeight: "bold"
              }}
              onClick={loadHistory}
              disabled={loading}
            >
              {loading ? "Searching..." : "SEARCH"}
            </Button>
          </Grid>
        </Grid>

        {header && (
         <Paper
    elevation={6}
    sx={{
        p:4,
        borderRadius:4,
        border:"1px solid #d0d7de",
        background:"#fff",
    }}
>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              mb={4}
            >
              HISTORY CARD
            </Typography>

           

        <Grid container spacing={3}>

  {/* ---------------- LEFT COLUMN ---------------- */}

  <Grid item xs={12} md={4}>
    <Typography sx={{ mb: 2 }}>
      <b>Description :</b> {header?.GITypeInfo?.GIType || "-"}
    </Typography>

    <Typography sx={{ mb: 2 }}>
      <b>MFG Sr No :</b> {header.MFGSrNo || "-"}
    </Typography>

    <Typography sx={{ mb: 2 }}>
      <b>Calibration Frequency :</b>{" "}
      {header.Frequency != null && header.Frequency !== ""
        ? `${header.Frequency} Months`
        : "-"}
    </Typography>
  </Grid>

  {/* ---------------- CENTER COLUMN ---------------- */}

  <Grid item xs={12} md={4}>

    <Typography sx={{ mb: 2 }}>
      <b>Code No :</b> {header.GaugeIDNo || "-"}
    </Typography>

    <Typography sx={{ mb: 2 }}>
      <b>Make :</b> {header.Make || "-"}
    </Typography>

    {/* PLUG GAUGE */}

    {isPlugGauge && (
      <>
       <Typography sx={{ mb: 2 }}>
  <b>Go Size :</b>{" "}
  {header.GoSize != null ? `${header.GoSize} mm` : "-"}
</Typography>

<Typography sx={{ mb: 2 }}>
  <b>No Go Size :</b>{" "}
  {header.NoGoSize != null ? `${header.NoGoSize} mm` : "-"}
</Typography>
      </>
    )}

    {/* RING GAUGE */}

    {isRingGauge && (
      <Typography sx={{ mb: 2 }}>
        <b>Size :</b> {header.STDSpecification || "-"}
      </Typography>
    )}

    {/* PLUNGER */}

    {isPlungerDial && (
      <>
       <Typography sx={{ mb: 2 }}>
  <b>Range :</b>{" "}
  {header.GIRangeFrom} - {header.GIRangeTo} mm
</Typography>

<Typography sx={{ mb: 2 }}>
  <b>L.C :</b>{" "}
  {header.GILC} mm
</Typography>
      </>
    )}

    {/* BORE */}

    {isBoreGauge && (
      <>
        <Typography sx={{ mb: 2 }}>
          <b>STD Specification :</b>{" "}
          {header.STDSpecification || "-"}
        </Typography>

        <Typography sx={{ mb: 2 }}>
        <Typography sx={{ mb: 2 }}>
  <b>L.C :</b>{" "}
  {header.GILC} mm
</Typography>
        </Typography>
      </>
    )}

    {/* VERNIER */}

    {isVernier && (
      <>
        <Typography sx={{ mb: 2 }}>
  <b>Range :</b>{" "}
  {header.GIRangeFrom} - {header.GIRangeTo} mm
</Typography>

<Typography sx={{ mb: 2 }}>
  <b>L.C :</b>{" "}
  {header.GILC} mm
</Typography>
      </>
    )}

    {/* THREAD */}

    {isThreadGauge && (
      <Typography sx={{ mb: 2 }}>
        <b>STD Specification :</b>{" "}
        {header.STDSpecification || "-"}
      </Typography>
    )}

  </Grid>

  {/* ---------------- RIGHT COLUMN ---------------- */}

  <Grid item xs={12} md={4}>

    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "#f8fbff",
        border: "1px solid #1976d2",
        minHeight: 180
      }}
    >

      <Typography
        fontWeight="bold"
        color="primary"
        sx={{ mb: 3 }}
      >
        Acceptance Criteria
      </Typography>

     

     <Typography
  sx={{
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 2,
  }}
>
   Refer Calibration Certificate <b>OR</b>  Own Decided Criteria
</Typography>

    </Paper>

  </Grid>

</Grid>

            <Divider sx={{ my: 3 }} />

           <Typography
    variant="h5"
    fontWeight="bold"
    color="#1565c0"
    mb={3}
>
    Calibration History
</Typography>

          <TableContainer
    sx={{
        border: "1px solid #d0d7de",
        borderRadius: 2,
        overflow: "hidden",
    }}
>
            <Table
    size="small"
    sx={{
        "& td": {
            textAlign: "center",
            verticalAlign: "middle",
        },
        "& th": {
            textAlign: "center",
        },
    }}
>
               <TableHead>
  <TableRow
    sx={{
      backgroundColor: "#1565c0",
    }}
  >
    <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
      Calibration Date
    </TableCell>

  

    <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
      Calibrated By
    </TableCell>

    <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
      Certificate No
    </TableCell>

    <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
      Observation
    </TableCell>

    <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
      Remark
    </TableCell>

    <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
      Next Due Date
    </TableCell>
  </TableRow>
</TableHead>

              <TableBody>
  {history.length > 0 ? (
    history.map((item, index) => (
      <TableRow
        key={index}
        hover
        sx={{
          backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
          "&:hover": {
            backgroundColor: "#e3f2fd",
          },
        }}
      >
        {/* Calibration Date */}
        <TableCell>
          {formatDate(item.CalibratedOn)}
        </TableCell>

       

        {/* Calibration Agency */}
        <TableCell>
          Ravikiran Calibration Lab
        </TableCell>

        {/* Certificate No */}
        <TableCell>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span>{item.CalCertificateNo || "-"}</span>

            <Button
              variant="contained"
              size="small"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
                minWidth: 75,
              }}
              disabled={!item.CalCertificateNo}
              onClick={() => openPdf(item)}
            >
              PDF
            </Button>
          </Box>
        </TableCell>

        {/* Observation */}
        <TableCell>
          Ref. Calibration Certificate
        </TableCell>

       

       {/* Remark */}
<TableCell>{""}</TableCell>

        {/* Next Due Date */}
        <TableCell>
          {formatDate(item.NextDueOn)}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} align="center">
        No Calibration History Found
      </TableCell>
    </TableRow>
  )}
</TableBody>

              </Table>
            </TableContainer>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}

export default HistoryCard;





















































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Divider,
//   TableContainer,
//   MenuItem
// } from "@mui/material";

// function HistoryCard() {
//   const navigate = useNavigate();

//   // 1. All Hooks MUST be at the top level, before any conditional returns
//   const [gaugeNo, setGaugeNo] = useState("");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [gaugeList, setGaugeList] = useState([]);

//   // 2. Perform the logic check after the Hooks have initialized
//   const customerData = localStorage.getItem("customer");
//   const customer = customerData ? JSON.parse(customerData) : {};


//    const customerId = customer.CustomerID;

//     const loadGaugeList = async () => {

//   try {

//     const res = await axios.get(
//       `http://localhost:5000/api/history-gauges?customerId=${customerId}`
//     );

//     setGaugeList(res.data.data);

//   } catch (err) {

//     console.log(err);

//   }

// };


// useEffect(() => {

//   if(customerId){
//     loadGaugeList();
//   }

// }, [customerId]);


//   if (!customer.CustomerID) {
//     navigate("/");
//     return null;
//   }

 


 




//   const loadHistory = async () => {


//   console.log("Search Button Clicked");
//   console.log("Gauge =", gaugeNo);
//   console.log("Customer =", customerId);

//     if (!gaugeNo.trim()) {
//       alert("Please Enter Gauge Code");
//       return;
//     }

//     setLoading(true);

//   try {

//   console.log("Calling API...");

//   const res = await axios.get(
//     `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${gaugeNo.trim()}`
//   );

//   console.log("API Response =", res);
//   console.log("Success =", res.data.success);
//   console.log("Total Records =", res.data.data.length);
//   console.log("Data =", res.data.data);

//   if (!res.data.success || res.data.data.length === 0) {
//     setData([]);
//     alert("No History Found");
//     return;
//   }

//   setData(res.data.data);

// } catch (err) {

//   console.log("========== ERROR ==========");
//   console.log(err);

//   if (err.response) {
//     console.log("Status =", err.response.status);
//     console.log("Response =", err.response.data);
//   } else {
//     console.log("Message =", err.message);
//   }

//   setData([]);

//   alert(
//     err.response?.data?.message ||
//     "Unable to Load History"
//   );
// } finally {
//       setLoading(false);
//     }
//   };

//   const header = data.length > 0 ? data[0] : null;

//  const giType =
//   header?.GITypeInfo?.GIType?.trim().toUpperCase() || "";

// const isPlugGauge =
//   giType.includes("PLUG GAUGE") ||
//   giType.includes("WIDTH GAUGE") ||
//   giType.includes("SNAP GAUGE") ||
//   giType.includes("FLUSH PIN GAUGE") ||
//   giType.includes("PADDLE GAUGE");


// /* ===================== RING GAUGE ===================== */

// const isRingGauge =
//   giType.includes("RING GAUGE") ||
//   giType.includes("SETTING MASTER ID") ||
//   giType.includes("SETTING MASTER OD") ||
//   giType.includes("HEIGHT BLOCK") ||
//   giType.includes("SETTING MASTER PLUG") ||
//   giType.includes("OD MASTER") ||
//   giType.includes("MICROMETER SETTING MASTER") ||
//   giType.includes("PIN GAUGE");


// /* ===================== PLUNGER DIAL ===================== */

// const isPlungerDial =
//   giType.includes("PLUNGER DIAL") ||
//   giType.includes("LEVER DIAL");


// /* ===================== BORE GAUGE ===================== */

// const isBoreGauge =
//   giType.includes("BORE GAUGE") ||
//   giType.includes("DIAL SNAP GAUGE") ||
//   giType.includes("INTERNAL DIAL COMPARATOR") ||
//   giType.includes("INTERNAL DIAL COMPARATOR GAUGE");


// /* ===================== VERNIER ===================== */

// const isVernier =
//   giType.includes("VERNIER CALLIPER") ||
//   giType.includes("MICROMETER") ||
//   giType.includes("MICROMETERS") ||
//   giType.includes("DIGITAL CALIPER") ||
//   giType.includes("DIGITAL DEPTH GAUGE") ||
//   giType.includes("DIGITAL HEIGHT GAUGE") ||
//   giType.includes("VERNIER HEIGHT GAUGE") ||
//   giType.includes("VERNIER DEPTH GAUGE");


// /* ===================== THREAD GAUGE ===================== */

// const isThreadGauge =
//   giType.includes("THREAD PLUG GAUGE") ||
//   giType.includes("TAPER THREAD GAUGE");

  
//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleDateString("en-GB");
//   };

//   const openPdf = (item) => {
//     if (!item.CalCertificateNo) {
//       alert("PDF Not Available");
//       return;
//     }

//     const fileName = item.CalCertificateNo.replace(/\//g, "-");

//     window.open(
//       `http://localhost:5000/certificates/${fileName}.pdf`,
//       "_blank"
//     );
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#0f172a,#1e293b)",
//         p: 4
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           p: 4,
//           borderRadius: 3
//         }}
//       >
//         <Typography
//           variant="h5"
//           textAlign="center"
//           fontWeight="bold"
//           color="primary"
//         >
//           {customer.Customer}
//         </Typography>
//         <Typography align="center" color="gray" mb={3}>
//           Customer ID : {customer.CustomerID}
//         </Typography>

//         <Typography
//           variant="h4"
//           textAlign="center"
//           fontWeight="bold"
//           mb={4}
//         >
//           HISTORY CARD
//         </Typography>

//         <Grid container spacing={2} mb={4}>
//           <Grid item xs={12} md={8}>
// <TextField
//   select
//   fullWidth
//   label="Gauge Code No"
//   value={gaugeNo}
//   onChange={(e) => setGaugeNo(e.target.value)}
// >

//   <MenuItem value="">
//     Select Gauge Code
//   </MenuItem>

//   {gaugeList.map((item,index)=>(
//     <MenuItem
//       key={index}
//       value={item.GaugeIDNo}
//     >
//       {item.GaugeIDNo}
//     </MenuItem>
//   ))}

// </TextField>

//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 height: 56,
//                 fontSize: 18,
//                 fontWeight: "bold"
//               }}
//               onClick={loadHistory}
//               disabled={loading}
//             >
//               {loading ? "Searching..." : "SEARCH"}
//             </Button>
//           </Grid>
//         </Grid>

//         {header && (
//          <Paper
//     elevation={6}
//     sx={{
//         p:4,
//         borderRadius:4,
//         border:"1px solid #d0d7de",
//         background:"#fff",
//     }}
// >
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               mb={4}
//             >
//               HISTORY CARD
//             </Typography>

//             <Typography variant="h6" fontWeight="bold">
//               {header.CustomerInfo?.Customer || "-"}
//             </Typography>

//             <Typography mb={3}>
//               {header.CustomerInfo?.Address || ""}{" "}
//               {header.CustomerInfo?.City || ""}
//             </Typography>

//         <Grid container spacing={3}>

//   {/* ---------------- LEFT COLUMN ---------------- */}

//   <Grid item xs={12} md={4}>
//     <Typography sx={{ mb: 2 }}>
//       <b>Description :</b> {header?.GITypeInfo?.GIType || "-"}
//     </Typography>

//     <Typography sx={{ mb: 2 }}>
//       <b>MFG Sr No :</b> {header.MFGSrNo || "-"}
//     </Typography>

//     <Typography sx={{ mb: 2 }}>
//       <b>Calibration Frequency :</b>{" "}
//       {header.Frequency != null && header.Frequency !== ""
//         ? `${header.Frequency} Months`
//         : "-"}
//     </Typography>
//   </Grid>

//   {/* ---------------- CENTER COLUMN ---------------- */}

//   <Grid item xs={12} md={4}>

//     <Typography sx={{ mb: 2 }}>
//       <b>Code No :</b> {header.GaugeIDNo || "-"}
//     </Typography>

//     <Typography sx={{ mb: 2 }}>
//       <b>Make :</b> {header.Make || "-"}
//     </Typography>

//     {/* PLUG GAUGE */}

//     {isPlugGauge && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>Go Size :</b>{" "}
//           {header.GoSize ?? "-"} {header.SizeUnit || header.GIRangeUnit}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>No Go Size :</b>{" "}
//           {header.NoGoSize ?? "-"} {header.SizeUnit || header.GIRangeUnit}
//         </Typography>
//       </>
//     )}

//     {/* RING GAUGE */}

//     {isRingGauge && (
//       <Typography sx={{ mb: 2 }}>
//         <b>Size :</b> {header.STDSpecification || "-"}
//       </Typography>
//     )}

//     {/* PLUNGER */}

//     {isPlungerDial && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>Range :</b>{" "}
//           {header.GIRangeFrom} - {header.GIRangeTo} {header.GIRangeUnit}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>L.C :</b> {header.GILC} {header.GILCUnit}
//         </Typography>
//       </>
//     )}

//     {/* BORE */}

//     {isBoreGauge && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>STD Specification :</b>{" "}
//           {header.STDSpecification || "-"}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>L.C :</b> {header.GILC} {header.GILCUnit}
//         </Typography>
//       </>
//     )}

//     {/* VERNIER */}

//     {isVernier && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>Range :</b>{" "}
//           {header.GIRangeFrom} - {header.GIRangeTo} {header.GIRangeUnit}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>L.C :</b> {header.GILC} {header.GILCUnit}
//         </Typography>
//       </>
//     )}

//     {/* THREAD */}

//     {isThreadGauge && (
//       <Typography sx={{ mb: 2 }}>
//         <b>STD Specification :</b>{" "}
//         {header.STDSpecification || "-"}
//       </Typography>
//     )}

//   </Grid>

//   {/* ---------------- RIGHT COLUMN ---------------- */}

//   <Grid item xs={12} md={4}>

//     <Paper
//       elevation={2}
//       sx={{
//         p: 2,
//         borderRadius: 2,
//         bgcolor: "#f8fbff",
//         border: "1px solid #1976d2",
//         minHeight: 180
//       }}
//     >

//       <Typography
//         fontWeight="bold"
//         color="primary"
//         sx={{ mb: 3 }}
//       >
//         Acceptance Criteria
//       </Typography>

     

//      <Typography
//   sx={{
//     fontSize: 16,
//     fontWeight: 500,
//     lineHeight: 2,
//   }}
// >
//    Refer Calibration Certificate <b>OR</b>  Own Decided Criteria
// </Typography>

//     </Paper>

//   </Grid>

// </Grid>

//             <Divider sx={{ my: 3 }} />

//            <Typography
//     variant="h5"
//     fontWeight="bold"
//     color="#1565c0"
//     mb={3}
// >
//     Calibration History
// </Typography>

//           <TableContainer
//     sx={{
//         border: "1px solid #d0d7de",
//         borderRadius: 2,
//         overflow: "hidden",
//     }}
// >
//             <Table
//     size="small"
//     sx={{
//         "& td": {
//             textAlign: "center",
//             verticalAlign: "middle",
//         },
//         "& th": {
//             textAlign: "center",
//         },
//     }}
// >
//                <TableHead>
//   <TableRow
//     sx={{
//       backgroundColor: "#1565c0",
//     }}
//   >
//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Calibration Date
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Calibrated By
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Calibration Agency
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Certificate No
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Observation
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Remark
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Next Due Date
//     </TableCell>
//   </TableRow>
// </TableHead>

//               <TableBody>
//   {data.length > 0 ? (
//     data.map((item, index) => (
//       <TableRow
//         key={index}
//         hover
//         sx={{
//           backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
//           "&:hover": {
//             backgroundColor: "#e3f2fd",
//           },
//         }}
//       >
//         {/* Calibration Date */}
//         <TableCell>
//           {formatDate(item.CalibratedOn)}
//         </TableCell>

//         {/* Calibrated By */}
//         <TableCell>
//           -
//         </TableCell>

//         {/* Calibration Agency */}
//         <TableCell>
//           Ravi Kiran Calibration Lab
//         </TableCell>

//         {/* Certificate No */}
//         <TableCell>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <span>{item.CalCertificateNo || "-"}</span>

//             <Button
//               variant="contained"
//               size="small"
//               sx={{
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 minWidth: 75,
//               }}
//               disabled={!item.CalCertificateNo}
//               onClick={() => openPdf(item)}
//             >
//               PDF
//             </Button>
//           </Box>
//         </TableCell>

//         {/* Observation */}
//         <TableCell>
//           Ref. Calibration Certificate
//         </TableCell>

//         {/* Remark */}
//         <TableCell>
//           -
//         </TableCell>

//         {/* Next Due Date */}
//         <TableCell>
//           {formatDate(item.NextDueOn)}
//         </TableCell>
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={7} align="center">
//         No Calibration History Found
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>

//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default HistoryCard;









































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Divider,
//   TableContainer,
//   MenuItem
// } from "@mui/material";

// function HistoryCard() {
//   const navigate = useNavigate();

//   // 1. All Hooks MUST be at the top level, before any conditional returns
//   const [gaugeNo, setGaugeNo] = useState("");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [gaugeList, setGaugeList] = useState([]);

//   // 2. Perform the logic check after the Hooks have initialized
//   const customerData = localStorage.getItem("customer");
//   const customer = customerData ? JSON.parse(customerData) : {};


//    const customerId = customer.CustomerID;

//   const loadGaugeList = async () => {

//   console.log("==================================");
//   console.log("Loading Gauge List...");
//   console.log("Customer ID :", customerId);

//   if (!customerId) {
//     console.log("Customer ID is missing");
//     return;
//   }

//   try {

//     const url = `http://localhost:5000/api/history-gauges?customerId=${customerId}`;

//     console.log("API URL :", url);

//     const res = await axios.get(url);

//     console.log("API Response :", res.data);

//     if (res.data.success) {

//       console.log("Total Gauges :", res.data.count);
//       console.log("Gauge List :", res.data.data);

//       setGaugeList(res.data.data || []);

//     } else {

//       console.log("API returned success = false");

//       setGaugeList([]);

//     }

//   } catch (err) {

//     console.error("History Gauges Error :", err);

//     if (err.response) {
//       console.log("Status :", err.response.status);
//       console.log("Response :", err.response.data);
//     }

//     setGaugeList([]);

//   }

//   console.log("==================================");

// };



// useEffect(() => {

//   if(customerId){
//     loadGaugeList();
//   }

// }, [customerId]);useEffect(() => {

//   console.log("================================");
//   console.log("useEffect Executed");
//   console.log("Customer ID :", customerId);

//   if (customerId) {

//     console.log("Calling loadGaugeList()...");

//     loadGaugeList();

//   } else {

//     console.log("Customer ID not found");

//   }

//   console.log("================================");

// }, [customerId]);


//   if (!customer.CustomerID) {
//     navigate("/");
//     return null;
//   }

 


 




//   const loadHistory = async () => {


//   console.log("Search Button Clicked");
//   console.log("Gauge =", gaugeNo);
//   console.log("Customer =", customerId);

//     if (!gaugeNo.trim()) {
//       alert("Please Enter Gauge Code");
//       return;
//     }

//     setLoading(true);

//   try {

//   console.log("Calling API...");

//   const res = await axios.get(
//     `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${gaugeNo.trim()}`
//   );

//   console.log("API Response =", res);
//   console.log("Success =", res.data.success);
//   console.log("Total Records =", res.data.data.length);
//   console.log("Data =", res.data.data);

//   if (!res.data.success || res.data.data.length === 0) {
//     setData([]);
//     alert("No History Found");
//     return;
//   }

//   setData(res.data.data);

// } catch (err) {

//   console.log("========== ERROR ==========");
//   console.log(err);

//   if (err.response) {
//     console.log("Status =", err.response.status);
//     console.log("Response =", err.response.data);
//   } else {
//     console.log("Message =", err.message);
//   }

//   setData([]);

//   alert(
//     err.response?.data?.message ||
//     "Unable to Load History"
//   );
// } finally {
//       setLoading(false);
//     }
//   };

//   const header = data.length > 0 ? data[0] : null;

//  const giType =
//   header?.GITypeInfo?.GIType?.trim().toUpperCase() || "";

// const isPlugGauge =
//   giType.includes("PLUG GAUGE") ||
//   giType.includes("WIDTH GAUGE") ||
//   giType.includes("SNAP GAUGE") ||
//   giType.includes("FLUSH PIN GAUGE") ||
//   giType.includes("PADDLE GAUGE");


// /* ===================== RING GAUGE ===================== */

// const isRingGauge =
//   giType.includes("RING GAUGE") ||
//   giType.includes("SETTING MASTER ID") ||
//   giType.includes("SETTING MASTER OD") ||
//   giType.includes("HEIGHT BLOCK") ||
//   giType.includes("SETTING MASTER PLUG") ||
//   giType.includes("OD MASTER") ||
//   giType.includes("MICROMETER SETTING MASTER") ||
//   giType.includes("PIN GAUGE");


// /* ===================== PLUNGER DIAL ===================== */

// const isPlungerDial =
//   giType.includes("PLUNGER DIAL") ||
//   giType.includes("LEVER DIAL");


// /* ===================== BORE GAUGE ===================== */

// const isBoreGauge =
//   giType.includes("BORE GAUGE") ||
//   giType.includes("DIAL SNAP GAUGE") ||
//   giType.includes("INTERNAL DIAL COMPARATOR") ||
//   giType.includes("INTERNAL DIAL COMPARATOR GAUGE");


// /* ===================== VERNIER ===================== */

// const isVernier =
//   giType.includes("VERNIER CALLIPER") ||
//   giType.includes("MICROMETER") ||
//   giType.includes("MICROMETERS") ||
//   giType.includes("DIGITAL CALIPER") ||
//   giType.includes("DIGITAL DEPTH GAUGE") ||
//   giType.includes("DIGITAL HEIGHT GAUGE") ||
//   giType.includes("VERNIER HEIGHT GAUGE") ||
//   giType.includes("VERNIER DEPTH GAUGE");


// /* ===================== THREAD GAUGE ===================== */

// const isThreadGauge =
//   giType.includes("THREAD PLUG GAUGE") ||
//   giType.includes("TAPER THREAD GAUGE");

  
//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleDateString("en-GB");
//   };

//   const openPdf = (item) => {
//     if (!item.CalCertificateNo) {
//       alert("PDF Not Available");
//       return;
//     }

//     const fileName = item.CalCertificateNo.replace(/\//g, "-");

//     window.open(
//       `http://localhost:5000/certificates/${fileName}.pdf`,
//       "_blank"
//     );
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#0f172a,#1e293b)",
//         p: 4
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           p: 4,
//           borderRadius: 3
//         }}
//       >
//         <Typography
//           variant="h5"
//           textAlign="center"
//           fontWeight="bold"
//           color="primary"
//         >
//           {customer.Customer}
//         </Typography>
//         <Typography align="center" color="gray" mb={3}>
//           Customer ID : {customer.CustomerID}
//         </Typography>

//         <Typography
//           variant="h4"
//           textAlign="center"
//           fontWeight="bold"
//           mb={4}
//         >
//           HISTORY CARD
//         </Typography>

//         <Grid container spacing={2} mb={4}>
//           <Grid item xs={12} md={8}>

//  <TextField
//   select
//   fullWidth
//   label="Gauge Code No"
//   value={gaugeNo}
//   onChange={(e) => setGaugeNo(e.target.value)}
// >

//   <MenuItem value="">
//     Select Gauge Code
//   </MenuItem>

//   {gaugeList.map((item,index)=>(
//     <MenuItem
//       key={index}
//       value={item.GaugeIDNo}
//     >
//       {item.GaugeIDNo}
//     </MenuItem>
//   ))}

// </TextField>

//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 height: 56,
//                 fontSize: 18,
//                 fontWeight: "bold"
//               }}
//               onClick={loadHistory}
//               disabled={loading}
//             >
//               {loading ? "Searching..." : "SEARCH"}
//             </Button>
//           </Grid>
//         </Grid>

//         {header && (
//          <Paper
//     elevation={6}
//     sx={{
//         p:4,
//         borderRadius:4,
//         border:"1px solid #d0d7de",
//         background:"#fff",
//     }}
// >
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               mb={4}
//             >
//               HISTORY CARD
//             </Typography>

//             <Typography variant="h6" fontWeight="bold">
//               {header.CustomerInfo?.Customer || "-"}
//             </Typography>

//             <Typography mb={3}>
//               {header.CustomerInfo?.Address || ""}{" "}
//               {header.CustomerInfo?.City || ""}
//             </Typography>

//         <Grid container spacing={3}>

//   {/* ---------------- LEFT COLUMN ---------------- */}

//   <Grid item xs={12} md={4}>
//     <Typography sx={{ mb: 2 }}>
//       <b>Description :</b> {header?.GITypeInfo?.GIType || "-"}
//     </Typography>

//     <Typography sx={{ mb: 2 }}>
//       <b>MFG Sr No :</b> {header.MFGSrNo || "-"}
//     </Typography>

//     <Typography sx={{ mb: 2 }}>
//       <b>Calibration Frequency :</b>{" "}
//       {header.Frequency != null && header.Frequency !== ""
//         ? `${header.Frequency} Months`
//         : "-"}
//     </Typography>
//   </Grid>

//   {/* ---------------- CENTER COLUMN ---------------- */}

//   <Grid item xs={12} md={4}>

//     <Typography sx={{ mb: 2 }}>
//       <b>Code No :</b> {header.GaugeIDNo || "-"}
//     </Typography>

//     <Typography sx={{ mb: 2 }}>
//       <b>Make :</b> {header.Make || "-"}
//     </Typography>

//     {/* PLUG GAUGE */}

//     {isPlugGauge && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>Go Size :</b>{" "}
//           {header.GoSize ?? "-"} {header.SizeUnit || header.GIRangeUnit}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>No Go Size :</b>{" "}
//           {header.NoGoSize ?? "-"} {header.SizeUnit || header.GIRangeUnit}
//         </Typography>
//       </>
//     )}

//     {/* RING GAUGE */}

//     {isRingGauge && (
//       <Typography sx={{ mb: 2 }}>
//         <b>Size :</b> {header.STDSpecification || "-"}
//       </Typography>
//     )}

//     {/* PLUNGER */}

//     {isPlungerDial && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>Range :</b>{" "}
//           {header.GIRangeFrom} - {header.GIRangeTo} {header.GIRangeUnit}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>L.C :</b> {header.GILC} {header.GILCUnit}
//         </Typography>
//       </>
//     )}

//     {/* BORE */}

//     {isBoreGauge && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>STD Specification :</b>{" "}
//           {header.STDSpecification || "-"}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>L.C :</b> {header.GILC} {header.GILCUnit}
//         </Typography>
//       </>
//     )}

//     {/* VERNIER */}

//     {isVernier && (
//       <>
//         <Typography sx={{ mb: 2 }}>
//           <b>Range :</b>{" "}
//           {header.GIRangeFrom} - {header.GIRangeTo} {header.GIRangeUnit}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>L.C :</b> {header.GILC} {header.GILCUnit}
//         </Typography>
//       </>
//     )}

//     {/* THREAD */}

//     {isThreadGauge && (
//       <Typography sx={{ mb: 2 }}>
//         <b>STD Specification :</b>{" "}
//         {header.STDSpecification || "-"}
//       </Typography>
//     )}

//   </Grid>

//   {/* ---------------- RIGHT COLUMN ---------------- */}

//   <Grid item xs={12} md={4}>

//     <Paper
//       elevation={2}
//       sx={{
//         p: 2,
//         borderRadius: 2,
//         bgcolor: "#f8fbff",
//         border: "1px solid #1976d2",
//         minHeight: 180
//       }}
//     >

//       <Typography
//         fontWeight="bold"
//         color="primary"
//         sx={{ mb: 3 }}
//       >
//         Acceptance Criteria
//       </Typography>

     

//      <Typography
//   sx={{
//     fontSize: 16,
//     fontWeight: 500,
//     lineHeight: 2,
//   }}
// >
//    Refer Calibration Certificate <b>OR</b>  Own Decided Criteria
// </Typography>

//     </Paper>

//   </Grid>

// </Grid>

//             <Divider sx={{ my: 3 }} />

//            <Typography
//     variant="h5"
//     fontWeight="bold"
//     color="#1565c0"
//     mb={3}
// >
//     Calibration History
// </Typography>

//           <TableContainer
//     sx={{
//         border: "1px solid #d0d7de",
//         borderRadius: 2,
//         overflow: "hidden",
//     }}
// >
//             <Table
//     size="small"
//     sx={{
//         "& td": {
//             textAlign: "center",
//             verticalAlign: "middle",
//         },
//         "& th": {
//             textAlign: "center",
//         },
//     }}
// >
//                <TableHead>
//   <TableRow
//     sx={{
//       backgroundColor: "#1565c0",
//     }}
//   >
//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Calibration Date
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Calibrated By
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Calibration Agency
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Certificate No
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Observation
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Remark
//     </TableCell>

//     <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//       Next Due Date
//     </TableCell>
//   </TableRow>
// </TableHead>

//               <TableBody>
//   {data.length > 0 ? (
//     data.map((item, index) => (
//       <TableRow
//         key={index}
//         hover
//         sx={{
//           backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
//           "&:hover": {
//             backgroundColor: "#e3f2fd",
//           },
//         }}
//       >
//         {/* Calibration Date */}
//         <TableCell>
//           {formatDate(item.CalibratedOn)}
//         </TableCell>

//         {/* Calibrated By */}
//         <TableCell>
//           -
//         </TableCell>

//         {/* Calibration Agency */}
//         <TableCell>
//           Ravi Kiran Calibration Lab
//         </TableCell>

//         {/* Certificate No */}
//         <TableCell>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <span>{item.CalCertificateNo || "-"}</span>

//             <Button
//               variant="contained"
//               size="small"
//               sx={{
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 minWidth: 75,
//               }}
//               disabled={!item.CalCertificateNo}
//               onClick={() => openPdf(item)}
//             >
//               PDF
//             </Button>
//           </Box>
//         </TableCell>

//         {/* Observation */}
//         <TableCell>
//           Ref. Calibration Certificate
//         </TableCell>

//         {/* Remark */}
//         <TableCell>
//           -
//         </TableCell>

//         {/* Next Due Date */}
//         <TableCell>
//           {formatDate(item.NextDueOn)}
//         </TableCell>
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={7} align="center">
//         No Calibration History Found
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>

//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default HistoryCard;