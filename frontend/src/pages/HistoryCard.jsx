// import React, { useState } from "react";
// import axios from "axios";

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
// } from "@mui/material";

// function HistoryCard() {

//   const [customerId, setCustomerId] =
//     useState("");

//   const [gaugeNo, setGaugeNo] =
//     useState("");

//   const [data, setData] =
//     useState([]);

//   const loadHistory = async () => {

//     try {

//       const res =
//         await axios.get(
//           `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${gaugeNo}`
//         );

//       setData(
//         res.data.data || []
//       );

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   const header =
//     data.length > 0
//       ? data[0]
//       : null;

//   return (

//     <Box
//       sx={{
//         minHeight: "100vh",
//         p: 4,
//         background:
//           "linear-gradient(135deg,#0f172a,#1e293b,#334155)"
//       }}
//     >

//       <Paper
//         elevation={10}
//         sx={{
//           p: 4,
//           borderRadius: 4
//         }}
//       >

//         <Typography
//           variant="h4"
//           textAlign="center"
//           fontWeight="bold"
//           mb={4}
//         >
//           HISTORY CARD
//         </Typography>

//         <Grid
//           container
//           spacing={2}
//           mb={4}
//         >

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Customer ID"
//               value={customerId}
//               onChange={(e) =>
//                 setCustomerId(
//                   e.target.value
//                 )
//               }
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Gauge Code No"
//               value={gaugeNo}
//               onChange={(e) =>
//                 setGaugeNo(
//                   e.target.value
//                 )
//               }
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 height: 56
//               }}
//               onClick={loadHistory}
//             >
//               SEARCH
//             </Button>
//           </Grid>

//         </Grid>

//         {header && (

//           <Paper
//             variant="outlined"
//             sx={{
//               p: 3,
//               border: "2px solid #000"
//             }}
//           >

//             <Typography
//               variant="h5"
//               align="center"
//               fontWeight="bold"
//               mb={3}
//             >
//               HISTORY CARD
//             </Typography>

//             <Grid
//               container
//               spacing={2}
//             >

//               <Grid item xs={6}>
//                 <b>Customer ID :</b>
//                 {" "}
//                 {header.Master?.CustomerID}
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Code No :</b>
//                 {" "}
//                 {header.LABIDNo}
//               </Grid>

//               <Grid item xs={6}>
//                 <b>MFG Sr No :</b>
//                 {" "}
//                 {header.MFGSrNo || "-"}
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Make :</b>
//                 {" "}
//                 {header.Make}
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Gauge No :</b>
//                 {" "}
//                 {header.GaugeIDNo}
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Range :</b>
//                 {" "}
//                 {header.GIRangeFrom}
//                 {" - "}
//                 {header.GIRangeTo}
//                 {" "}
//                 {header.GIRangeUnit}
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Frequency :</b>
//                 {" "}
//                 {header.Frequency}
//                 {" "}
//                 Months
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Remark :</b>
//                 {" "}
//                 {header.Remark}
//               </Grid>

//             </Grid>

//             <Divider
//               sx={{
//                 my: 3
//               }}
//             />

//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               mb={2}
//             >
//               Calibration History
//             </Typography>

//             <Table>

//               <TableHead>

//                 <TableRow>

//                   <TableCell>
//                     Date Of Calibration
//                   </TableCell>

//                   <TableCell>
//                     Certificate No
//                   </TableCell>

//                   <TableCell>
//                     Result
//                   </TableCell>

//                   <TableCell>
//                     Remark
//                   </TableCell>

//                   <TableCell>
//                     Next Due Date
//                   </TableCell>

//                 </TableRow>

//               </TableHead>

//               <TableBody>

//                 {data.map(
//                   (item, index) => (

//                     <TableRow key={index}>

//                       <TableCell>
//                         {item.CalibratedOn}
//                       </TableCell>

//                       <TableCell>
//                         {item.CalCertificateNo || "-"}
//                       </TableCell>

//                       <TableCell>
//                         {item.CalibrationResult || "-"}
//                       </TableCell>

//                       <TableCell>
//                         {item.Remark || "-"}
//                       </TableCell>

//                       <TableCell>
//                         {item.NextDueOn || "-"}
//                       </TableCell>

//                     </TableRow>

//                   )
//                 )}

//               </TableBody>

//             </Table>

//           </Paper>

//         )}

//       </Paper>

//     </Box>

//   );

// }

// export default HistoryCard;




















































// import React, { useState } from "react";
// import axios from "axios";

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
//   TableContainer
// } from "@mui/material";

// function HistoryCard() {

//   const [customerId, setCustomerId] = useState("");
//   const [gaugeNo, setGaugeNo] = useState("");
//   const [data, setData] = useState([]);

//   const loadHistory = async () => {

//     try {

//    const res = await axios.get(
//   `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${gaugeNo}`
// );

// console.log("FIRST RECORD =", res.data.data[0]);

// setData(res.data.data || []);

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   const header = data.length > 0 ? data[0] : null;

//  const formatDate = (date) => {

//   if (!date) return "-";

//   return new Date(date).toLocaleDateString("en-GB");

// };

// const openPdf = (item) => {

//   const fileName = item.CalCertificateNo.replace(/\//g, "-");

//   window.open(
//     `http://localhost:5000/certificates/${fileName}.pdf`,
//     "_blank"
//   );

// };


//   return (

//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg,#0f172a,#1e293b)",
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
//           variant="h4"
//           textAlign="center"
//           fontWeight="bold"
//           mb={4}
//         >
//           HISTORY CARD
//         </Typography>

//         <Grid container spacing={2} mb={4}>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Customer ID"
//               value={customerId}
//               onChange={(e) =>
//                 setCustomerId(e.target.value)
//               }
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Gauge Code No"
//               value={gaugeNo}
//               onChange={(e) =>
//                 setGaugeNo(e.target.value)
//               }
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{ height: 56 }}
//               onClick={loadHistory}
//             >
//               SEARCH
//             </Button>
//           </Grid>

//         </Grid>

//         {header && (

//           <Paper
//             sx={{
//               p: 4,
//               border: "2px solid #000",
//               borderRadius: 2
//             }}
//           >

//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               mb={4}
//             >
//               HISTORY CARD
//             </Typography>

//             <Typography
//               variant="h6"
//               fontWeight="bold"
//             >
//               {header.CustomerInfo?.Customer || "-"}
//             </Typography>

//             <Typography mb={3}>
//               {header.CustomerInfo?.Address || ""}
//               {" "}
//               {header.CustomerInfo?.City || ""}
//             </Typography>

//             <Grid container spacing={2}>

//               <Grid item xs={12} md={6}>
//                <b>Description :</b> {header.Description || "Plug Gaging"}
//                 {header.Master?.Description || "-"}
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <b>Code No :</b>{" "}
//                 {header.LABIDNo || "-"}
//               </Grid>

              

//               <Grid item xs={12} md={6}>
//                 <b>MFG Sr No :</b>{" "}
//                 {header.MFGSrNo || "-"}
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <b>Make :</b>{" "}
//                 {header.Make || "-"}
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <b>Range :</b>{" "}
//                 {header.GIRangeFrom}
//                 {" - "}
//                 {header.GIRangeTo}
//                 {" "}
//                 {header.GIRangeUnit}
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <b>L.C :</b>{" "}
//                 {header.GILC}
//                 {" "}
//                 {header.GILCUnit}
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <b>Calibration Frequency :</b>{" "}
//                 {header.Frequency}
//                 {" "}
//                 Months
//               </Grid>

              

//               <Grid item xs={12} md={6}>
//   <b>Size :</b> {header.Size || "-"}
// </Grid>

//             </Grid>

//             <Divider sx={{ my: 3 }} />

//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               mb={2}
//             >
//               Calibration History
//             </Typography>

//             <TableContainer>

//               <Table size="small">

//                <TableHead>
//   <TableRow>
//     <TableCell>Calibration Date</TableCell>

//     <TableCell>
//   Calibrated By
// </TableCell>



//     <TableCell>
//   Calibration Agency
// </TableCell>

//    <TableCell sx={{ minWidth: 220 }}>
//   Certificate No
// </TableCell>

//     <TableCell>
//   Observation
// </TableCell>

//     <TableCell>
//       Remark
//     </TableCell>

//     <TableCell>
//       Next Due Date
//     </TableCell>
//   </TableRow>
// </TableHead>

//                 <TableBody>

//                   {data.map((item, index) => (

//                    <TableRow key={index}>
//   <TableCell>
//     {formatDate(item.CalibratedOn)}
//   </TableCell>


//   <TableCell>
//   Ravi Kiran LAB
// </TableCell>



//  <TableCell>
//   {item.AgencyInfo?.CalibrationAgency || "Ravi Calibration Agency"}
// </TableCell>

// <TableCell>

//  <Box
//   sx={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     gap: 1
//   }}
// >
//     <span>
//       {item.CalCertificateNo || "-"}
//     </span>

//    <Button
//   variant="contained"
//   size="small"
//   sx={{
//     minWidth: 50,
//     height: 28,
//     fontSize: "12px",
//     padding: "2px 10px"
//   }}
//   onClick={() => openPdf(item)}
// >
//   PDF
// </Button>
//   </Box>
// </TableCell>



//   <TableCell>
//     {item.CalibrationResult || "-"}
//   </TableCell>

//   <TableCell>
    
//   </TableCell>

//   <TableCell>
//     {formatDate(item.NextDueOn)}
//   </TableCell>
// </TableRow>



//                   ))}

//                 </TableBody>

//               </Table>

//             </TableContainer>

//           </Paper>

//         )}

//       </Paper>

//     </Box>

//   );

// }

// export default HistoryCard;








import React, { useState } from "react";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 2. Perform the logic check after the Hooks have initialized
  const customerData = localStorage.getItem("customer");
  const customer = customerData ? JSON.parse(customerData) : {};

  if (!customer.CustomerID) {
    navigate("/");
    return null;
  }

  const customerId = customer.CustomerID;

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
  console.log("Total Records =", res.data.data.length);
  console.log("Data =", res.data.data);

  if (!res.data.success || res.data.data.length === 0) {
    setData([]);
    alert("No History Found");
    return;
  }

  setData(res.data.data);

} catch (err) {

  console.log("========== ERROR ==========");
  console.log(err);

  if (err.response) {
    console.log("Status =", err.response.status);
    console.log("Response =", err.response.data);
  } else {
    console.log("Message =", err.message);
  }

  setData([]);

  alert(
    err.response?.data?.message ||
    "Unable to Load History"
  );
} finally {
      setLoading(false);
    }
  };

  const header = data.length > 0 ? data[0] : null;

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
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          {customer.Customer}
        </Typography>
        <Typography align="center" color="gray" mb={3}>
          Customer ID : {customer.CustomerID}
        </Typography>

        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          HISTORY CARD
        </Typography>

        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Gauge Code No"
              placeholder="Enter Gauge Code"
              value={gaugeNo}
              onChange={(e) => setGaugeNo(e.target.value.trimStart())}
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

            <Typography variant="h6" fontWeight="bold">
              {header.CustomerInfo?.Customer || "-"}
            </Typography>

            <Typography mb={3}>
              {header.CustomerInfo?.Address || ""}{" "}
              {header.CustomerInfo?.City || ""}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <b>Description :</b>{" "}
                {header.Master?.Description || header.Description || "-"}
              </Grid>
              <Grid item xs={12} md={6}>
                <b>Code No :</b> {header.LABIDNo || "-"}
              </Grid>
              <Grid item xs={12} md={6}>
                <b>MFG Sr No :</b> {header.MFGSrNo || "-"}
              </Grid>
              <Grid item xs={12} md={6}>
                <b>Make :</b> {header.Make || "-"}
              </Grid>
              <Grid item xs={12} md={6}>
                <b>Range :</b> {header.GIRangeFrom || "-"}
                {" - "}
                {header.GIRangeTo || "-"} {header.GIRangeUnit || ""}
              </Grid>
              <Grid item xs={12} md={6}>
                <b>L.C :</b> {header.GILC || "-"} {header.GILCUnit || ""}
              </Grid>
              <Grid item xs={12} md={6}>
                <b>Calibration Frequency :</b> {header.Frequency || "-"} Months
              </Grid>
              <Grid item xs={12} md={6}>
                <b>Size :</b> {header.Size || "-"}
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
      Calibration Agency
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
                  {data.length > 0 ? (
                    data.map((item, index) => (
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
                        <TableCell>{formatDate(item.CalibratedOn)}</TableCell>
                        <TableCell>Ravi Kiran LAB</TableCell>
                       <TableCell>
  Ravi Kiran Calibration Agency
</TableCell>
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
                        <TableCell>{item.CalibrationResult || "-"}</TableCell>
                       <TableCell>-</TableCell>
                        <TableCell>{formatDate(item.NextDueOn)}</TableCell>
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