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




















































import React, { useState } from "react";
import axios from "axios";

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

  const [customerId, setCustomerId] = useState("");
  const [gaugeNo, setGaugeNo] = useState("");
  const [data, setData] = useState([]);

  const loadHistory = async () => {

    try {

   const res = await axios.get(
  `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${gaugeNo}`
);

console.log("FIRST RECORD =", res.data.data[0]);

setData(res.data.data || []);

    } catch (err) {

      console.log(err);

    }

  };

  const header = data.length > 0 ? data[0] : null;

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date)
      .toLocaleDateString("en-GB");

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
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
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          HISTORY CARD
        </Typography>

        <Grid container spacing={2} mb={4}>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Customer ID"
              value={customerId}
              onChange={(e) =>
                setCustomerId(e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Gauge Code No"
              value={gaugeNo}
              onChange={(e) =>
                setGaugeNo(e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: 56 }}
              onClick={loadHistory}
            >
              SEARCH
            </Button>
          </Grid>

        </Grid>

        {header && (

          <Paper
            sx={{
              p: 4,
              border: "2px solid #000",
              borderRadius: 2
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

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              {header.CustomerInfo?.Customer || "-"}
            </Typography>

            <Typography mb={3}>
              {header.CustomerInfo?.Address || ""}
              {" "}
              {header.CustomerInfo?.City || ""}
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={12} md={6}>
                <b>Customer ID :</b>{" "}
                {header.Master?.CustomerID || "-"}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>Code No :</b>{" "}
                {header.LABIDNo || "-"}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>Gauge No :</b>{" "}
                {header.GaugeIDNo || "-"}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>MFG Sr No :</b>{" "}
                {header.MFGSrNo || "-"}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>Make :</b>{" "}
                {header.Make || "-"}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>Range :</b>{" "}
                {header.GIRangeFrom}
                {" - "}
                {header.GIRangeTo}
                {" "}
                {header.GIRangeUnit}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>L.C :</b>{" "}
                {header.GILC}
                {" "}
                {header.GILCUnit}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>Calibration Frequency :</b>{" "}
                {header.Frequency}
                {" "}
                Months
              </Grid>

              <Grid item xs={12} md={6}>
                <b>Condition :</b>{" "}
                {header.ConditionofGauge || "-"}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>Go Size :</b>{" "}
                {header.GoSize || "-"}
              </Grid>

              <Grid item xs={12} md={6}>
                <b>No Go Size :</b>{" "}
                {header.NoGoSize || "-"}
              </Grid>

            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Calibration History
            </Typography>

            <TableContainer>

              <Table size="small">

                <TableHead>

                  <TableRow>

                    <TableCell>
                      Calibration Date
                    </TableCell>

                    <TableCell>
                      Certificate No
                    </TableCell>

                    <TableCell>
                      Result
                    </TableCell>

                    <TableCell>
                      Remark
                    </TableCell>

                    <TableCell>
                      Next Due Date
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {data.map((item, index) => (

                    <TableRow key={index}>

                      <TableCell>
                        {formatDate(
                          item.CalibratedOn
                        )}
                      </TableCell>

                      <TableCell>
                        {item.CalCertificateNo || "-"}
                      </TableCell>

                      <TableCell>
                        {item.CalibrationResult || "-"}
                      </TableCell>

                      <TableCell>
                        {item.Remark || "-"}
                      </TableCell>

                      <TableCell>
                        {formatDate(
                          item.NextDueOn
                        )}
                      </TableCell>

                    </TableRow>

                  ))}

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