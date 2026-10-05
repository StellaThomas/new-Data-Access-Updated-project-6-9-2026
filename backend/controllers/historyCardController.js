
const connectMongo = require("../config/db");

// =====================================================
// SAFE DATE ONLY EXPRESSION
// =====================================================
// IMPORTANT:
// NEVER convert BSON string -> Date here.
//
// Supports:
// 1. MongoDB Date
// 2. "2015-04-01 00:00:00"
// 3. "2015-04-01"
// 4. ISO string
//
// Everything is converted to STRING and first 10 chars
// are used as YYYY-MM-DD.
// =====================================================

const dateOnlyExpression = (field) => ({
  $substrCP: [
    {
      $convert: {
        input: field,
        to: "string",
        onError: "",
        onNull: "",
      },
    },
    0,
    10,
  ],
});

// =====================================================
// JAVASCRIPT DATE ONLY
// =====================================================

const normalizeDateOnly = (value) => {
  if (!value) {
    return null;
  }

  // JavaScript Date
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return value.toISOString().slice(0, 10);
  }

  // String
  const str = String(value).trim();

  if (!str) {
    return null;
  }

  // Example:
  // 2015-04-01
  // 2015-04-01 00:00:00
  // 2015-04-01T00:00:00.000Z

  const match = str.match(/^(\d{4}-\d{2}-\d{2})/);

  if (match) {
    return match[1];
  }

  return null;
};

// =====================================================
// FORMAT NO.1
// RING GAUGE
//
// Match:
// LABIDNo + InwardDate
//
// Observation:
// ActualSize
// =====================================================

const getFormat1Info = async (
  db,
  labId,
  inwardDate
) => {
  // =========================================================
  // VALIDATION
  // =========================================================

  if (!labId) {
    console.log(
      "FORMAT1: LABIDNo missing"
    );

    return null;
  }

  if (!inwardDate) {
    console.log(
      "FORMAT1: InwardDate missing"
    );

    return null;
  }

  // =========================================================
  // NORMALIZE INWARD DATE
  // =========================================================

  const inwardDateOnly =
    normalizeDateOnly(inwardDate);

  if (!inwardDateOnly) {
    console.log(
      "FORMAT1: Invalid InwardDate:",
      inwardDate
    );

    return null;
  }

  // =========================================================
  // LOG
  // =========================================================

  console.log(
    "================================="
  );

  console.log(
    "FORMAT 1 LOOKUP"
  );

  console.log(
    "Collection : TCalibrationDetailsFormatNo1"
  );

  console.log(
    "LABIDNo :",
    labId
  );

  console.log(
    "InwardDate :",
    inwardDate
  );

  console.log(
    "InwardDateOnly :",
    inwardDateOnly
  );

  console.log(
    "================================="
  );

  // =========================================================
  // MONGODB QUERY
  // =========================================================

  const result = await db
    .collection(
      "TCalibrationDetailsFormatNo1"
    )
    .aggregate([
      {
        $match: {
          $expr: {
            $and: [

              // =================================================
              // LABIDNo MATCH
              // =================================================

              {
                $eq: [
                  {
                    $trim: {
                      input: {
                        $toString:
                          "$LABIDNo",
                      },
                    },
                  },

                  String(labId).trim(),
                ],
              },

              // =================================================
              // INWARD DATE MATCH
              // =================================================

              {
                $eq: [
                  dateOnlyExpression(
                    "$InwardDate"
                  ),

                  inwardDateOnly,
                ],
              },
            ],
          },
        },
      },

      // =========================================================
      // RETURN FORMAT 1 DATA
      // =========================================================

      {
        $project: {
          _id: 0,

          // Basic information
          LABIDNo: 1,
          InwardDate: 1,
          Description: 1,

          // Gauge size
          GaugeSize: 1,

          // Actual size serial number
          ActualSizeSrNo: 1,

          // =====================================================
          // IMPORTANT
          // ActualSize will be used in HISTORY CARD OBSERVATION
          // =====================================================

          ActualSize: 1,

          // =====================================================
          // Observation
          // =====================================================

          Observation: "$ActualSize",
        },
      },

      // =========================================================
      // ONLY ONE RECORD
      // =========================================================

      {
        $limit: 1,
      },
    ])
    .toArray();

  // =========================================================
  // LOG RESULT
  // =========================================================

  console.log(
    "================================="
  );

  console.log(
    "FORMAT1 RESULT :",
    result
  );

  console.log(
    "FORMAT1 RESULT COUNT :",
    result.length
  );

  console.log(
    "================================="
  );

  // =========================================================
  // NO RECORD FOUND
  // =========================================================

  if (!result.length) {

    console.log(
      "FORMAT1: No matching record found"
    );

    console.log(
      "LABIDNo used for search :",
      labId
    );

    console.log(
      "InwardDate used for search :",
      inwardDateOnly
    );

    return null;
  }

  // =========================================================
  // FOUND
  // =========================================================

  const format1Info = result[0];

  console.log(
    "FORMAT1 DATA FOUND"
  );

  console.log(
    "LABIDNo :",
    format1Info.LABIDNo
  );

  console.log(
    "InwardDate :",
    format1Info.InwardDate
  );

  console.log(
    "GaugeSize :",
    format1Info.GaugeSize
  );

  console.log(
    "ActualSize :",
    format1Info.ActualSize
  );

  console.log(
    "Observation :",
    format1Info.Observation
  );

  // =========================================================
  // RETURN
  // =========================================================

  return format1Info;
};



// =====================================================
// FORMAT NO.5 LOOKUP
// PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH GAUGE
//
// MATCH:
// LABIDNo + InwardDate
//
// If exact date match is not found,
// fallback to LABIDNo only.
//
// IMPORTANT:
// This function affects ONLY FORMAT5.
// FORMAT1 and FORMAT10 remain unchanged.
// =====================================================

const getFormat5Info = async (
  db,
  labId,
  inwardDate
) => {
  if (!labId) {
    console.log(
      "FORMAT5: LABIDNo missing"
    );

    return null;
  }

  const labIdString =
    String(labId).trim();

  const inwardDateOnly =
    normalizeDateOnly(inwardDate);

  console.log(
    "================================="
  );

  console.log(
    "FORMAT 5 LOOKUP"
  );

  console.log(
    "LABIDNo :",
    labIdString
  );

  console.log(
    "Original InwardDate :",
    inwardDate
  );

  console.log(
    "Normalized InwardDate :",
    inwardDateOnly
  );

  // =====================================================
  // COMMON LABID CONDITION
  // =====================================================

  const labIdCondition = {
    $eq: [
      {
        $trim: {
          input: {
            $toString:
              "$LABIDNo",
          },
        },
      },
      labIdString,
    ],
  };

  // =====================================================
  // STEP 1
  // EXACT MATCH = LABIDNo + InwardDate
  // =====================================================

  let result = [];

  if (inwardDateOnly) {
    console.log(
      "FORMAT5: Trying LABIDNo + InwardDate"
    );

    result = await db
      .collection(
        "TCalibrationDetailsFormatNo5"
      )
      .aggregate([
        {
          $match: {
            $expr: {
              $and: [
                labIdCondition,

                {
                  $eq: [
                    dateOnlyExpression(
                      "$InwardDate"
                    ),
                    inwardDateOnly,
                  ],
                },
              ],
            },
          },
        },

        {
          $project: {
            _id: 0,

            // =========================================
            // IDENTIFICATION
            // =========================================

            LABIDNo: 1,
            InwardDate: 1,

            // =========================================
            // ACCEPTANCE CRITERIA - GO
            // =========================================

            GoSizeNew: 1,
            GoSizeMfgTol: 1,
            GoSizeWearLimit: 1,

            // =========================================
            // ACCEPTANCE CRITERIA - NO GO
            // =========================================

            NoGoSizeNew: 1,
            NoGoSizeMfgTol: 1,
            NoGoSizeWearLimit: 1,

            // =========================================
            // OBSERVATION - GO
            // =========================================

            GoSizeActual1: 1,
            GoSizeActual2: 1,

            // =========================================
            // OBSERVATION - NO GO
            // =========================================

            NoGoSizeActual1: 1,
            NoGoSizeActual2: 1,

            // =========================================
            // REMARK
            // =========================================

            GoSizeRemark: 1,
            NoGoSizeRemark: 1,
          },
        },

        {
          $limit: 1,
        },
      ])
      .toArray();

    console.log(
      "FORMAT5 EXACT MATCH RESULT :",
      result
    );
  }

  // =====================================================
  // STEP 2
  // FALLBACK = LABIDNo ONLY
  //
  // This is useful if TInward.InwardDate and
  // TCalibrationDetailsFormatNo5.InwardDate are
  // stored differently.
  // =====================================================

  if (result.length === 0) {
    console.log(
      "FORMAT5: Exact date match not found."
    );

    console.log(
      "FORMAT5: Trying LABIDNo only..."
    );

    result = await db
      .collection(
        "TCalibrationDetailsFormatNo5"
      )
      .aggregate([
        {
          $match: {
            $expr: {
              $and: [
                labIdCondition,
              ],
            },
          },
        },

        {
          $sort: {
            InwardDate: -1,
          },
        },

        {
          $project: {
            _id: 0,

            LABIDNo: 1,
            InwardDate: 1,

            // =========================================
            // ACCEPTANCE CRITERIA - GO
            // =========================================

            GoSizeNew: 1,
            GoSizeMfgTol: 1,
            GoSizeWearLimit: 1,

            // =========================================
            // ACCEPTANCE CRITERIA - NO GO
            // =========================================

            NoGoSizeNew: 1,
            NoGoSizeMfgTol: 1,
            NoGoSizeWearLimit: 1,

            // =========================================
            // OBSERVATION - GO
            // =========================================

            GoSizeActual1: 1,
            GoSizeActual2: 1,

            // =========================================
            // OBSERVATION - NO GO
            // =========================================

            NoGoSizeActual1: 1,
            NoGoSizeActual2: 1,

            // =========================================
            // REMARK
            // =========================================

            GoSizeRemark: 1,
            NoGoSizeRemark: 1,
          },
        },

        {
          $limit: 1,
        },
      ])
      .toArray();

    console.log(
      "FORMAT5 LABID ONLY RESULT :",
      result
    );
  }

  // =====================================================
  // STEP 3
  // NO DATA
  // =====================================================

  if (result.length === 0) {
    console.log(
      "FORMAT5: NO RECORD FOUND"
    );

    console.log(
      "Searched LABIDNo :",
      labIdString
    );

    console.log(
      "Searched InwardDate :",
      inwardDateOnly
    );

    return null;
  }

  // =====================================================
  // STEP 4
  // FINAL RESULT
  // =====================================================

  const format5 = result[0];

  console.log(
    "================================="
  );

  console.log(
    "FORMAT5 FINAL DATA :",
    format5
  );

  console.log(
    "GoSizeNew :",
    format5.GoSizeNew
  );

  console.log(
    "GoSizeMfgTol :",
    format5.GoSizeMfgTol
  );

  console.log(
    "GoSizeWearLimit :",
    format5.GoSizeWearLimit
  );

  console.log(
    "NoGoSizeNew :",
    format5.NoGoSizeNew
  );

  console.log(
    "NoGoSizeMfgTol :",
    format5.NoGoSizeMfgTol
  );

  console.log(
    "NoGoSizeWearLimit :",
    format5.NoGoSizeWearLimit
  );

  console.log(
    "GoSizeActual1 :",
    format5.GoSizeActual1
  );

  console.log(
    "GoSizeActual2 :",
    format5.GoSizeActual2
  );

  console.log(
    "NoGoSizeActual1 :",
    format5.NoGoSizeActual1
  );

  console.log(
    "NoGoSizeActual2 :",
    format5.NoGoSizeActual2
  );

  return format5;
};

// =====================================================
// FORMAT NO.10
// =====================================================

const getFormat10Info = async (
  db,
  labId,
  inwardDate
) => {
  if (!labId || !inwardDate) {
    console.log(
      "FORMAT10: Missing LABIDNo or InwardDate"
    );

    return null;
  }

  // IMPORTANT
  // Define inwardDateOnly here also.

  const inwardDateOnly =
    normalizeDateOnly(inwardDate);

  if (!inwardDateOnly) {
    console.log(
      "FORMAT10: Invalid InwardDate:",
      inwardDate
    );

    return null;
  }

  console.log(
    "================================="
  );

  console.log("FORMAT 10 LOOKUP");
  console.log("LABIDNo :", labId);
  console.log("InwardDate :", inwardDate);
  console.log(
    "InwardDate Only :",
    inwardDateOnly
  );

  const result = await db
    .collection("TCalibrationDetailsFormatNo10")
    .aggregate([
      {
        $match: {
          $expr: {
            $and: [
              // =========================================
              // LABIDNo
              // =========================================

              {
                $eq: [
                  {
                    $trim: {
                      input: {
                        $toString: "$LABIDNo",
                      },
                    },
                  },
                  String(labId).trim(),
                ],
              },

              // =========================================
              // INWARD DATE
              // =========================================

              {
                $eq: [
                  dateOnlyExpression(
                    "$InwardDate"
                  ),
                  inwardDateOnly,
                ],
              },
            ],
          },
        },
      },

      // =========================================
      // FORMAT 10 FIELDS
      // =========================================

      {
        $project: {
          _id: 0,

          LABIDNo: 1,

          InwardDate: 1,

          SpecifiedSize: 1,

          ActualSize: 1,
        },
      },

      {
        $limit: 1,
      },
    ])
    .toArray();

  console.log(
    "FORMAT10 RESULT :",
    result
  );

  return result.length > 0
    ? result[0]
    : null;
};

// =====================================================
// MAIN HISTORY CARD CONTROLLER
// =====================================================

const getHistoryCard = async (
  req,
  res
) => {
  try {
    // =====================================================
    // QUERY PARAMETERS
    // =====================================================

    const gaugeNo =
      req.query.gaugeNo?.trim();

    const customerId =
      Number(req.query.customerId);

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!gaugeNo) {
      return res.status(400).json({
        success: false,
        message:
          "Gauge Code is required",
      });
    }

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message:
          "Customer ID is required",
      });
    }

    console.log(
      "================================="
    );

    console.log(
      "HISTORY CARD REQUEST"
    );

    console.log(
      "Customer ID :",
      customerId
    );

    console.log(
      "Gauge No :",
      gaugeNo
    );

    // =====================================================
    // DATABASE
    // =====================================================

    const db = await connectMongo();

    // =====================================================
    // STEP 1
    // GET CUSTOMER INWARD NUMBERS
    // =====================================================

    const inwardList =
      await db
        .collection("TInward")
        .find(
          {
            CustomerID:
              customerId,
          },
          {
            projection: {
              _id: 0,
              InwardNo: 1,
            },
          }
        )
        .toArray();

    console.log(
      "Customer Inward List :",
      inwardList
    );

    if (inwardList.length === 0) {
      return res.json({
        success: true,
        header: null,
        history: [],
      });
    }

    const inwardNos =
      inwardList.map(
        (item) => item.InwardNo
      );

    console.log(
      "Customer Inward Nos :",
      inwardNos
    );

    // =====================================================
    // STEP 2
    // GET BASIC HISTORY
    // =====================================================

    let data =
      await db
        .collection("TInwardDetails")
        .aggregate([
          // ===============================================
          // GAUGE + CUSTOMER
          // ===============================================

          {
            $match: {
              GaugeIDNo:
                gaugeNo,

              InwardNo: {
                $in: inwardNos,
              },
            },
          },

          // ===============================================
          // SAFE CALIBRATION DATE STRING
          // ===============================================
          //
          // IMPORTANT:
          // OLD CODE WAS:
          //
          // $convert TO DATE
          //
          // That caused:
          // "can't convert from BSON type string to Date"
          //
          // NOW:
          // We convert everything TO STRING.
          // NEVER STRING -> DATE.
          // ===============================================

          {
            $addFields: {
              CalibrationDateString:
                dateOnlyExpression(
                  "$CalibratedOn"
                ),
            },
          },

          // ===============================================
          // ONLY 2026 ONWARDS
          // ===============================================

          {
            $match: {
              CalibrationDateString: {
                $gte: "2026-01-01",
              },
            },
          },

          // ===============================================
          // TINWARD LOOKUP
          // ===============================================

          {
            $lookup: {
              from: "TInward",

              localField:
                "InwardNo",

              foreignField:
                "InwardNo",

              as: "Inward",
            },
          },

          {
            $unwind: {
              path: "$Inward",

              preserveNullAndEmptyArrays:
                true,
            },
          },

          // ===============================================
          // CUSTOMER INFO
          // ===============================================

          {
            $lookup: {
              from: "mCustomer",

              localField:
                "Inward.CustomerID",

              foreignField:
                "CustomerID",

              as: "CustomerInfo",
            },
          },

          {
            $unwind: {
              path: "$CustomerInfo",

              preserveNullAndEmptyArrays:
                true,
            },
          },

          // ===============================================
          // GI TYPE
          // ===============================================

          {
            $lookup: {
              from: "mGIType",

              localField:
                "GITypeID",

              foreignField:
                "GITypeID",

              as: "GITypeInfo",
            },
          },

          {
            $unwind: {
              path: "$GITypeInfo",

              preserveNullAndEmptyArrays:
                true,
            },
          },

          // ===============================================
          // REMOVE DUPLICATE CERTIFICATES
          // ===============================================

          {
            $group: {
              _id: {
                GaugeIDNo:
                  "$GaugeIDNo",

                CalCertificateNo:
                  "$CalCertificateNo",
              },

              doc: {
                $first: "$$ROOT",
              },
            },
          },

          {
            $replaceRoot: {
              newRoot: "$doc",
            },
          },

          // ===============================================
          // LATEST FIRST
          // ===============================================

          {
            $sort: {
              CalibrationDateString:
                -1,
            },
          },

          // ===============================================
          // OUTPUT
          // ===============================================

          {
            $project: {
              _id: 0,

              InwardNo: 1,

              LABIDNo: 1,

              GaugeIDNo: 1,

              GITypeID: 1,

              GITypeInfo: 1,

              MFGSrNo: 1,

              Make: 1,

              GoSize: 1,

              NoGoSize: 1,

              Size: 1,

              SizeUnit: 1,

              STDSpecification: 1,

              GIRangeFrom: 1,

              GIRangeTo: 1,

              GIRangeUnit: 1,

              GILC: 1,

              GILCUnit: 1,

              Frequency: 1,

              CalibratedOn: 1,

              CalibrationDate:
                "$CalibrationDateString",

              NextDueOn: 1,

              CalibrationResult: 1,

              CalCertificateNo: 1,

              CustomerInfo: 1,

              Inward: 1,
            },
          },
        ])
        .toArray();

    console.log(
      "BASIC HISTORY COUNT :",
      data.length
    );

    // =====================================================
    // STEP 3
    // SWITCH CASE
    // =====================================================

    data = await Promise.all(
      data.map(
        async (item) => {
          // ===============================================
          // GI TYPE NAME
          // ===============================================

          const giTypeName =
            String(
              item
                ?.GITypeInfo
                ?.GIType || ""
            )
              .trim()
              .toUpperCase();

          // ===============================================
          // INWARD DATE
          // ===============================================

          const inwardDate =
            item.Inward?.InwardDate ||
            item.InwardDate ||
            null;

          // ===============================================
          // NORMALIZED DATE
          // ===============================================

          const inwardDateOnly =
            normalizeDateOnly(
              inwardDate
            );

          console.log(
            "================================="
          );

          console.log(
            "PROCESSING HISTORY ITEM"
          );

          console.log(
            "Gauge :",
            item.GaugeIDNo
          );

          console.log(
            "GI Type :",
            giTypeName
          );

          console.log(
            "LABIDNo :",
            item.LABIDNo
          );

          console.log(
            "InwardDate :",
            inwardDate
          );

          console.log(
            "InwardDateOnly :",
            inwardDateOnly
          );

          // ===============================================
          // INFO VARIABLES
          // ===============================================

          let Format1Info = null;

          let Format5Info = null;

          let Format10Info = null;

          let selectedFormat = null;

          // =================================================
          // SWITCH CASE
          // =================================================

// ===============================================================
// FORMAT SELECTION
// ===============================================================

switch (giTypeName) {

  // =============================================================
  // FORMAT NO.1
  // RING GAUGE
  // =============================================================

  case "RING GAUGE": {

    selectedFormat = "FORMAT1";

    console.log("=================================");
    console.log("FORMAT 1 SELECTED");
    console.log("GI Type     :", giTypeName);
    console.log("LABIDNo     :", item?.LABIDNo);
    console.log("InwardDate  :", inwardDate);
    console.log("=================================");

    Format1Info = await getFormat1Info(
      db,
      item?.LABIDNo,
      inwardDate
    );

    console.log(
      "Format1Info :",
      Format1Info
    );

    // ActualSize check
    if (Format1Info) {
      console.log(
        "FORMAT 1 ActualSize :",
        Format1Info.ActualSize
      );
    } else {
      console.log(
        "FORMAT 1 data not found"
      );
    }

    break;
  }


  // =============================================================
  // FORMAT NO.5
  // PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH GAUGE
  // =============================================================

  case "PADDLE GAUGE":
  case "PLUG GAUGE":
  case "SNAP GAUGE":
  case "FLUSH PIN GAUGE":
  case "WIDTH GAUGE": {

    selectedFormat = "FORMAT5";

    console.log("=================================");
    console.log("FORMAT 5 SELECTED");
    console.log("GI Type     :", giTypeName);
    console.log("LABIDNo     :", item?.LABIDNo);
    console.log("InwardDate  :", inwardDate);
    console.log("=================================");

    Format5Info = await getFormat5Info(
      db,
      item?.LABIDNo,
      inwardDate
    );

    console.log(
      "Format5Info :",
      Format5Info
    );

    if (Format5Info) {

      console.log(
        "GoSizeActual1 :",
        Format5Info.GoSizeActual1
      );

      console.log(
        "GoSizeActual2 :",
        Format5Info.GoSizeActual2
      );

      console.log(
        "NoGoSizeActual1 :",
        Format5Info.NoGoSizeActual1
      );

      console.log(
        "NoGoSizeActual2 :",
        Format5Info.NoGoSizeActual2
      );

      console.log(
        "GoSizeNew :",
        Format5Info.GoSizeNew
      );

      console.log(
        "GoSizeMfgTol :",
        Format5Info.GoSizeMfgTol
      );

      console.log(
        "GoSizeWearLimit :",
        Format5Info.GoSizeWearLimit
      );

      console.log(
        "NoGoSizeNew :",
        Format5Info.NoGoSizeNew
      );

      console.log(
        "NoGoSizeMfgTol :",
        Format5Info.NoGoSizeMfgTol
      );

      console.log(
        "NoGoSizeWearLimit :",
        Format5Info.NoGoSizeWearLimit
      );

    } else {

      console.log(
        "FORMAT 5 data not found"
      );
    }

    break;
  }


  // =============================================================
  // FORMAT NO.10
  // EXISTING FORMAT 10 LOGIC
  // =============================================================

  default: {

    selectedFormat = "FORMAT10";

    console.log("=================================");
    console.log("FORMAT 10 SELECTED");
    console.log("GI Type     :", giTypeName);
    console.log("LABIDNo     :", item?.LABIDNo);
    console.log("InwardDate  :", inwardDate);
    console.log("=================================");

    Format10Info = await getFormat10Info(
      db,
      item?.LABIDNo,
      inwardDate
    );

    console.log(
      "Format10Info :",
      Format10Info
    );

    if (!Format10Info) {
      console.log(
        "FORMAT 10 data not found"
      );
    }

    break;
  }
}
         

          // =================================================
// RETURN FINAL ITEM
// =================================================

return {
  ...item,

  SelectedFormat: selectedFormat,

  // ==============================================
  // FORMAT 1 - RING GAUGE
  // ==============================================
  Format1Info,

  // ==============================================
  // FORMAT 5
  // ==============================================
  Format5Info,

  // ==============================================
  // FORMAT 10
  // ==============================================
  Format10Info,
};
        }
      )
    );

    // =====================================================
    // STEP 4
    // DEBUG
    // =====================================================

    console.log(
      "================================="
    );

    console.log(
      "FINAL HISTORY COUNT :",
      data.length
    );

    data.forEach(
      (item, index) => {
        console.log(
          `========== HISTORY ${
            index + 1
          } ==========`
        );

        console.log(
          "GI Type :",
          item
            ?.GITypeInfo
            ?.GIType
        );

        console.log(
          "GaugeIDNo :",
          item.GaugeIDNo
        );

        console.log(
          "LABIDNo :",
          item.LABIDNo
        );

        console.log(
          "InwardNo :",
          item.InwardNo
        );

        console.log(
          "SelectedFormat :",
          item.SelectedFormat
        );

        // ===============================================
        // FORMAT 1
        // ===============================================

        if (
          item.SelectedFormat ===
          "FORMAT1"
        ) {
          console.log(
            "----------- FORMAT 1 -----------"
          );

          console.log(
            "Format1Info :",
            item.Format1Info
          );

          console.log(
            "ActualSize :",
            item
              .Format1Info
              ?.ActualSize
          );

          console.log(
            "Observation :",
            item
              .Format1Info
              ?.Observation
          );
        }

        // ===============================================
        // FORMAT 5
        // ===============================================

        if (
          item.SelectedFormat ===
          "FORMAT5"
        ) {
          console.log(
            "----------- FORMAT 5 -----------"
          );

          console.log(
            "Format5Info :",
            item.Format5Info
          );

          console.log(
            "GoSizeActual1 :",
            item
              .Format5Info
              ?.GoSizeActual1
          );

          console.log(
            "GoSizeActual2 :",
            item
              .Format5Info
              ?.GoSizeActual2
          );

          console.log(
            "NoGoSizeActual1 :",
            item
              .Format5Info
              ?.NoGoSizeActual1
          );

          console.log(
            "NoGoSizeActual2 :",
            item
              .Format5Info
              ?.NoGoSizeActual2
          );
        }

        // ===============================================
        // FORMAT 10
        // ===============================================

        if (
          item.SelectedFormat ===
          "FORMAT10"
        ) {
          console.log(
            "----------- FORMAT 10 -----------"
          );

          console.log(
            "Format10Info :",
            item.Format10Info
          );

          console.log(
            "SpecifiedSize :",
            item
              .Format10Info
              ?.SpecifiedSize
          );

          console.log(
            "ActualSize :",
            item
              .Format10Info
              ?.ActualSize
          );
        }
      }
    );

    // =====================================================
    // STEP 5
    // LOGIN CUSTOMER
    // =====================================================

    const loginCustomer =
      await db
        .collection("mCustomer")
        .findOne(
          {
            CustomerID:
              customerId,
          },
          {
            projection: {
              _id: 0,

              CustomerID: 1,

              Customer: 1,

              Address: 1,

              City: 1,

              Phone: 1,

              Email: 1,

              GSTNo: 1,
            },
          }
        );

    // =====================================================
    // STEP 6
    // HEADER
    // =====================================================

    const header =
      data.length > 0
        ? {
            ...data[0],

            CustomerInfo:
              loginCustomer,
          }
        : null;

    // =====================================================
    // FINAL RESPONSE
    // =====================================================

    console.log(
      "================================="
    );

    console.log(
      "HEADER :",
      header
    );

    console.log(
      "HISTORY COUNT :",
      data.length
    );

    return res.json({
      success: true,

      header: header,

      history: data,
    });
  } catch (err) {
    console.error(
      "================================="
    );

    console.error(
      "HISTORY CARD CONTROLLER ERROR"
    );

    console.error(err);

    console.error(
      "================================="
    );

    return res.status(500).json({
      success: false,

      message:
        err.message ||
        "Internal Server Error",
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getHistoryCard,
};