








































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
  TableContainer,
} from "@mui/material";

function HistoryCard() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [gaugeNo, setGaugeNo] = useState("");
  const [header, setHeader] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // CUSTOMER
  // =====================================================

  const customerData = localStorage.getItem("customer");
  const customer = customerData
    ? JSON.parse(customerData)
    : {};

  const customerId = customer.CustomerID;

  // =====================================================
  // LOGIN CHECK
  // =====================================================

  if (!customer.CustomerID) {
    navigate("/");
    return null;
  }

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  const loadHistory = async () => {
    console.log("=================================");
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
        `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${encodeURIComponent(
          gaugeNo.trim()
        )}`
      );

      console.log("API Response =", res);
      console.log("Success =", res.data.success);
      console.log("Header =", res.data.header);
      console.log("History =", res.data.history);
      console.log(
        "History Count =",
        res.data.history?.length
      );

      if (!res.data.success) {
        setHeader(null);
        setHistory([]);

        alert("No History Found");
        return;
      }

      setHeader(res.data.header || null);
      setHistory(res.data.history || []);


      console.log(
  "FINAL HEADER FORMAT5 =",
  res.data.header?.Format5Info
);

console.log(
  "FINAL HISTORY FORMAT5 =",
  res.data.history?.[0]?.Format5Info
);

      console.log("=================================");
    } catch (err) {
      console.log("========== ERROR ==========");
      console.log(err);

      if (err.response) {
        console.log(
          "Status =",
          err.response.status
        );

        console.log(
          "Response =",
          err.response.data
        );
      } else {
        console.log(
          "Message =",
          err.message
        );
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

  // =====================================================
  // GI TYPE
  // =====================================================

  const giType =
    header?.GITypeInfo?.GIType
      ?.trim()
      .toUpperCase() || "";

  // =====================================================
  // SELECTED FORMAT
  //
  // Backend sends:
  //
  // FORMAT1
  // FORMAT5
  // FORMAT10
  // =====================================================

  const selectedFormat =
    header?.SelectedFormat || "";

  // =====================================================
  // FORMAT NO.5 GAUGES
  // =====================================================

  const isFormat5Gauge =
    selectedFormat === "FORMAT5" ||
    giType.includes("PLUG GAUGE") ||
    giType.includes("WIDTH GAUGE") ||
    giType.includes("SNAP GAUGE") ||
    giType.includes("FLUSH PIN GAUGE") ||
    giType.includes("PADDLE GAUGE");

  // =====================================================
  // FORMAT NO.10 GAUGES
  // =====================================================

  const isFormat10Gauge =
    selectedFormat === "FORMAT10" ||
    giType.includes("THREAD PLUG GAUGE") ||
    giType.includes("TAPER THREAD GAUGE");

  // =====================================================
  // RING GAUGE
  //
  // ONLY RING GAUGE
  //
  // Format No.1
  // =====================================================

  const isRingGauge =
    selectedFormat === "FORMAT1" ||
    giType.includes("RING GAUGE");

  // =====================================================
  // PLUNGER DIAL
  // =====================================================

  const isPlungerDial =
    giType.includes("PLUNGER DIAL") ||
    giType.includes("LEVER DIAL");

  // =====================================================
  // BORE GAUGE
  // =====================================================

  const isBoreGauge =
    giType.includes("BORE GAUGE") ||
    giType.includes("DIAL SNAP GAUGE") ||
    giType.includes(
      "INTERNAL DIAL COMPARATOR"
    ) ||
    giType.includes(
      "INTERNAL DIAL COMPARATOR GAUGE"
    );

  // =====================================================
  // VERNIER
  // =====================================================

  const isVernier =
    giType.includes("VERNIER CALLIPER") ||
    giType.includes("MICROMETER") ||
    giType.includes("MICROMETERS") ||
    giType.includes("DIGITAL CALIPER") ||
    giType.includes("DIGITAL DEPTH GAUGE") ||
    giType.includes("DIGITAL HEIGHT GAUGE") ||
    giType.includes("VERNIER HEIGHT GAUGE") ||
    giType.includes("VERNIER DEPTH GAUGE");

  // =====================================================
  // FORMAT VALUE HELPER
  // =====================================================

  const showValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    return value;
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (
      Number.isNaN(parsedDate.getTime())
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-GB"
    );
  };

  // =====================================================
  // PDF
  // =====================================================

  const openPdf = (item) => {
    if (!item?.CalCertificateNo) {
      alert("PDF Not Available");
      return;
    }

    const certificateNo =
      item.CalCertificateNo.trim();

    const fileName =
      certificateNo.replace(/\//g, "-");

    const pdfUrl = `http://localhost:5000/certificates/${encodeURIComponent(
      fileName
    )}.pdf`;

    console.log(
      "Certificate No:",
      certificateNo
    );

    console.log(
      "PDF File Name:",
      `${fileName}.pdf`
    );

    console.log(
      "PDF URL:",
      pdfUrl
    );

    window.open(pdfUrl, "_blank");
  };

  // =====================================================
  // FORMAT NO.5 ACCEPTANCE CRITERIA
  // =====================================================


const renderFormat5AcceptanceCriteria = () => {
  // First try header Format5Info
  // If not available, take it from latest history record
  const format5 =
    header?.Format5Info ||
    history?.[0]?.Format5Info ||
    null;

  console.log("========== FORMAT 5 UI ==========");
  console.log("Header Format5Info =", header?.Format5Info);
  console.log("History[0] Format5Info =", history?.[0]?.Format5Info);
  console.log("Final Format5Info =", format5);

  if (!format5) {
    return (
      <Typography
        sx={{
          fontSize: 15,
          color: "red",
        }}
      >
        Format 5 data not found
      </Typography>
    );
  }

  return (
    <Box>

      {/* ==============================
          GO
      ============================== */}

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>Go Size:</b>{" "}
        {showValue(format5.GoSizeNew)}
      </Typography>

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>Go Mfg Tol:</b>{" "}
        {showValue(format5.GoSizeMfgTol)}
      </Typography>

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>Go Wear Limit:</b>{" "}
        {showValue(format5.GoSizeWearLimit)}
      </Typography>

      <Divider sx={{ my: 1 }} />

      {/* ==============================
          NO GO
      ============================== */}

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>No Go Size:</b>{" "}
        {showValue(format5.NoGoSizeNew)}
      </Typography>

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>No Go Mfg Tol:</b>{" "}
        {showValue(format5.NoGoSizeMfgTol)}
      </Typography>

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>No Go Wear Limit:</b>{" "}
        {showValue(format5.NoGoSizeWearLimit)}
      </Typography>

    </Box>
  );
};

  // =====================================================
  // FORMAT NO.10 ACCEPTANCE CRITERIA
  // =====================================================

  const renderFormat10AcceptanceCriteria =
    () => {
      return (
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 2,
          }}
        >
          {showValue(
            header?.Format10Info
              ?.SpecifiedSize
          )}
        </Typography>
      );
    };

  // =====================================================
  // ACCEPTANCE CRITERIA
  // =====================================================

  const renderAcceptanceCriteria =
    () => {
      if (isFormat5Gauge) {
        return renderFormat5AcceptanceCriteria();
      }

      if (isFormat10Gauge) {
        return renderFormat10AcceptanceCriteria();
      }

      return "-";
    };

  
// =====================================================
// OBSERVATION
// =====================================================

const renderObservation = (item) => {
  const itemFormat =
    item?.SelectedFormat || "";

  const itemGiType =
    item?.GITypeInfo?.GIType
      ?.trim()
      .toUpperCase() || "";

  // ===================================================
  // FORMAT NO.1
  // RING GAUGE
  // ActualSize -> Observation
  // ===================================================

  if (
    itemFormat === "FORMAT1" ||
    itemGiType.includes("RING GAUGE")
  ) {
    return (
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        {showValue(
          item?.Format1Info?.ActualSize
        )}
      </Typography>
    );
  }

  // ===================================================
  // FORMAT NO.10
  // ActualSize -> Observation
  // ===================================================

  if (
    itemFormat === "FORMAT10" ||
    itemGiType.includes("THREAD PLUG GAUGE") ||
    itemGiType.includes("TAPER THREAD GAUGE")
  ) {
    return (
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        {showValue(
          item?.Format10Info?.ActualSize
        )}
      </Typography>
    );
  }

  // ===================================================
  // FORMAT NO.5
  // PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH
  //
  // IMPORTANT:
  // GoSize  -> Observation
  // NoGoSize -> Observation
  // ===================================================

 // ===================================================
// FORMAT NO.5
// PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH
//
// Observation comes from:
// TCalibrationDetailsFormatNo5
//
// Go:
// GoSizeActual1 / GoSizeActual2
//
// No Go:
// NoGoSizeActual1 / NoGoSizeActual2
// ===================================================

if (
  itemFormat === "FORMAT5" ||
  itemGiType.includes("PLUG GAUGE") ||
  itemGiType.includes("WIDTH GAUGE") ||
  itemGiType.includes("SNAP GAUGE") ||
  itemGiType.includes("FLUSH PIN GAUGE") ||
  itemGiType.includes("PADDLE GAUGE")
) {
  const format5 = item?.Format5Info;

  if (!format5) {
    return "-";
  }

  return (
    <Box>
      {/* GO */}

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>Go:</b>{" "}
        {showValue(
          format5.GoSizeActual1
        )}
        {" / "}
        {showValue(
          format5.GoSizeActual2
        )}
      </Typography>

      {/* NO GO */}

      <Typography
        sx={{
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <b>No Go:</b>{" "}
        {showValue(
          format5.NoGoSizeActual1
        )}
        {" / "}
        {showValue(
          format5.NoGoSizeActual2
        )}
      </Typography>
    </Box>
  );
}

  return "-";
};

  // =====================================================
  // UI
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        p: 4,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* =================================================
            CUSTOMER + SEARCH
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {header?.CustomerInfo?.Customer ||
                customer.Customer}
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                color: "#444",
                mt: 0.5,
              }}
            >
              {header?.CustomerInfo?.Address ||
                ""}

              {header?.CustomerInfo?.City
                ? `, ${header.CustomerInfo.City}`
                : ""}
            </Typography>
          </Box>
        </Box>

        {/* =================================================
            SEARCH
        ================================================= */}

        <Grid
          container
          spacing={2}
          mb={4}
        >
          <Grid
            item
            xs={12}
            md={8}
          >
            <TextField
              fullWidth
              label="Gauge Code No"
              placeholder="Enter Gauge Code"
              value={gaugeNo}
              onChange={(e) =>
                setGaugeNo(e.target.value)
              }
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: 56,
                fontSize: 18,
                fontWeight: "bold",
              }}
              onClick={loadHistory}
              disabled={loading}
            >
              {loading
                ? "Searching..."
                : "SEARCH"}
            </Button>
          </Grid>
        </Grid>

        {/* =================================================
            HISTORY CARD
        ================================================= */}

        {header && (
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              border:
                "1px solid #d0d7de",
              background: "#fff",
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

            <Grid
              container
              spacing={3}
            >
              {/* ===========================================
                  LEFT COLUMN
              =========================================== */}

              <Grid
                item
                xs={12}
                md={4}
              >
                <Typography sx={{ mb: 2 }}>
                  <b>Description :</b>{" "}
                  {header?.GITypeInfo
                    ?.GIType || "-"}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  <b>MFG Sr No :</b>{" "}
                  {header.MFGSrNo || "-"}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  <b>
                    Calibration Frequency :
                  </b>{" "}
                  {header.Frequency != null &&
                  header.Frequency !== ""
                    ? `${header.Frequency} Months`
                    : "-"}
                </Typography>
              </Grid>

              {/* ===========================================
                  CENTER COLUMN
              =========================================== */}

              <Grid
                item
                xs={12}
                md={4}
              >
                {/* CODE NO */}

                <Typography sx={{ mb: 2 }}>
                  <b>Code No :</b>{" "}
                  {header.GaugeIDNo || "-"}
                </Typography>

                {/* MAKE */}

                <Typography sx={{ mb: 2 }}>
                  <b>Make :</b>{" "}
                  {header.Make || "-"}
                </Typography>

                {/* =========================================
                    FORMAT 5
                ========================================= */}

                {isFormat5Gauge && (
                  <>
                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>Go Size :</b>{" "}
                      {header.GoSize != null
                        ? `${header.GoSize} mm`
                        : "-"}
                    </Typography>

                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>No Go Size :</b>{" "}
                      {header.NoGoSize != null
                        ? `${header.NoGoSize} mm`
                        : "-"}
                    </Typography>
                  </>
                )}

                {/* =========================================
                    RING GAUGE
                    FORMAT NO.1
                ========================================= */}

                {isRingGauge && (
                  <Typography
                    sx={{ mb: 2 }}
                  >
                    <b>Size :</b>{" "}
                    {header?.Format1Info
                      ?.GaugeSize != null
                      ? `${header.Format1Info.GaugeSize} mm`
                      : header?.STDSpecification
                      ? header.STDSpecification
                      : "-"}
                  </Typography>
                )}

                {/* =========================================
                    PLUNGER
                ========================================= */}

                {isPlungerDial && (
                  <>
                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>Range :</b>{" "}
                      {header.GIRangeFrom} -{" "}
                      {header.GIRangeTo} mm
                    </Typography>

                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>L.C :</b>{" "}
                      {header.GILC} mm
                    </Typography>
                  </>
                )}

                {/* =========================================
                    BORE
                ========================================= */}

                {isBoreGauge && (
                  <>
                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>
                        STD Specification :
                      </b>{" "}
                      {header.STDSpecification ||
                        "-"}
                    </Typography>

                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>L.C :</b>{" "}
                      {header.GILC} mm
                    </Typography>
                  </>
                )}

                {/* =========================================
                    VERNIER
                ========================================= */}

                {isVernier && (
                  <>
                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>Range :</b>{" "}
                      {header.GIRangeFrom} -{" "}
                      {header.GIRangeTo} mm
                    </Typography>

                    <Typography
                      sx={{ mb: 2 }}
                    >
                      <b>L.C :</b>{" "}
                      {header.GILC} mm
                    </Typography>
                  </>
                )}

                {/* =========================================
                    THREAD / FORMAT 10
                ========================================= */}

                {isFormat10Gauge && (
                  <Typography
                    sx={{ mb: 2 }}
                  >
                    <b>
                      STD Specification :
                    </b>{" "}
                    {header.STDSpecification ||
                      "-"}
                  </Typography>
                )}
              </Grid>

              {/* ===========================================
                  RIGHT COLUMN
                  ACCEPTANCE CRITERIA
              =========================================== */}

              <Grid
                item
                xs={12}
                md={4}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#f8fbff",
                    border:
                      "1px solid #1976d2",
                    minHeight: 180,
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 3 }}
                  >
                    Acceptance Criteria
                  </Typography>

                  {renderAcceptanceCriteria()}
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* =================================================
                CALIBRATION HISTORY
            ================================================= */}

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
                border:
                  "1px solid #d0d7de",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Table
                size="small"
                sx={{
                  "& td": {
                    textAlign: "center",
                    verticalAlign:
                      "middle",
                  },
                  "& th": {
                    textAlign: "center",
                  },
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor:
                        "#1565c0",
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight:
                          "bold",
                        fontSize: 15,
                      }}
                    >
                      Calibration Date
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight:
                          "bold",
                        fontSize: 15,
                      }}
                    >
                      Calibrated By
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight:
                          "bold",
                        fontSize: 15,
                      }}
                    >
                      Certificate No
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight:
                          "bold",
                        fontSize: 15,
                      }}
                    >
                      Observation
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight:
                          "bold",
                        fontSize: 15,
                      }}
                    >
                      Remark
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight:
                          "bold",
                        fontSize: 15,
                      }}
                    >
                      Next Due Date
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {history.length > 0 ? (
                    history.map(
                      (item, index) => (
                        <TableRow
                          key={index}
                          hover
                          sx={{
                            backgroundColor:
                              index %
                                2 ===
                              0
                                ? "#ffffff"
                                : "#f8f9fa",

                            "&:hover": {
                              backgroundColor:
                                "#e3f2fd",
                            },
                          }}
                        >
                          {/* =================================
                              CALIBRATION DATE
                          ================================= */}

                          <TableCell>
                            {formatDate(
                              item.CalibratedOn
                            )}
                          </TableCell>

                          {/* =================================
                              CALIBRATION AGENCY
                          ================================= */}

                          <TableCell>
                            Ravikiran
                            Calibration Lab
                          </TableCell>

                          {/* =================================
                              CERTIFICATE
                          ================================= */}

                          <TableCell>
                            <Box
                              sx={{
                                display:
                                  "flex",
                                justifyContent:
                                  "space-between",
                                alignItems:
                                  "center",
                                gap: 1,
                              }}
                            >
                              <span>
                                {item.CalCertificateNo ||
                                  "-"}
                              </span>

                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  borderRadius:
                                    "8px",
                                  textTransform:
                                    "none",
                                  fontWeight:
                                    "bold",
                                  minWidth:
                                    75,
                                }}
                                disabled={
                                  !item.CalCertificateNo
                                }
                                onClick={() =>
                                  openPdf(
                                    item
                                  )
                                }
                              >
                                PDF
                              </Button>
                            </Box>
                          </TableCell>

                          {/* =================================
                              OBSERVATION
                          ================================= */}

                          <TableCell>
                            {renderObservation(
                              item
                            )}
                          </TableCell>

                          {/* =================================
                              REMARK
                          ================================= */}

                         <TableCell>
  -
</TableCell>

                          {/* =================================
                              NEXT DUE DATE
                          ================================= */}

                          <TableCell>
                            {formatDate(
                              item.NextDueOn
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="center"
                      >
                        No Calibration
                        History Found
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







































