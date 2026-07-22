

const express = require("express");
const router = express.Router();

const connectMongo = require("../config/db");

// LOGIN
router.post("/access", async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== "suvarn") {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const db = await connectMongo();

    const collections = await db
      .listCollections()
      .toArray();

    const tables = collections.map(
      (item) => item.name
    );

    res.status(200).json({
      success: true,
      message: "Database Connected Successfully",
      tables,
    });
  } catch (error) {
    console.log("ACCESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});




// GET TABLE DATA
router.get("/table/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;

    const db = await connectMongo();

    const totalCount = await db
      .collection(tableName)
      .countDocuments();

    const data = await db
      .collection(tableName)
      .find({})
      .toArray();

    res.status(200).json({
      success: true,
      count: totalCount,
      data,
    });

  } catch (error) {
    console.log("TABLE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



// GET ALL TABLES
router.get("/tables", async (req, res) => {
  try {
    const db = await connectMongo();

    const collections = await db
      .listCollections()
      .toArray();

    const tables = collections.map(
      (item) => item.name
    );

    res.status(200).json({
      success: true,
      tables,
    });
  } catch (error) {
    console.log("TABLE LIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});




// INWARD REPORT

router.get(
  "/inward-report/:inwardNo",
  async (req, res) => {
    try {

      const db = await connectMongo();

      const inwardNo = Number(
        req.params.inwardNo
      );

      const data = await db
        .collection("TInwardDetails")

        .aggregate([
  {
    $match: {
      LABIDNo: gaugeNo
    }
  },

  {
    $lookup: {
      from: "mCalibrationAgency",
      localField: "CalibrationAgencyID",
      foreignField: "CalibrationAgencyID",
      as: "AgencyInfo"
    }
  },

  {
    $unwind: {
      path: "$AgencyInfo",
      preserveNullAndEmptyArrays: true
    }
  },

  {
    $sort: {
      CalibratedOn: 1
    }
  }
])
        .toArray();

      res.json({
        success: true,
        count: data.length,
        data
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);




// INWARD SUMMARY REPORT

router.get(
  "/inward-summary",
  async (req, res) => {
    try {

      const db = await connectMongo();

     const data = await db
  .collection("TInwardDetails")
  .aggregate([

    {
      $group: {
        _id: "$InwardNo",
        TotalItems: {
          $sum: 1
        }
      }
    },

    {
      $lookup: {
        from: "TInward",
        let: {
          inwardNo: "$_id"
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  "$InwardNo",
                  "$$inwardNo"
                ]
              }
            }
          },

          {
            $limit: 1
          }
        ],
        as: "Master"
      }
    },

    {
      $unwind: {
        path: "$Master",
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $project: {
        _id: 0,
        InwardNo: "$_id",
        InwardDate:
          "$Master.InwardDate",
        CustomerID:
          "$Master.CustomerID",
        TotalItems: 1
      }
    },

    {
      $sort: {
        InwardNo: 1
      }
    }

  ])
  .toArray();

      res.json({
        success: true,
        count: data.length,
        data
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);


// FULL JOIN REPORT

router.get(
  "/inward-full-report",
  async (req, res) => {
    try {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 100;

      const skip =
        (page - 1) * limit;

      const db = await connectMongo();

      const totalRecords =
        await db
          .collection("TInwardDetails")
          .countDocuments();

      const data = await db
        .collection("TInwardDetails")
        .aggregate([
          {
            $lookup: {
              from: "TInward",

              let: {
                inwardNo: "$InwardNo"
              },

              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: [
                        "$InwardNo",
                        "$$inwardNo"
                      ]
                    }
                  }
                },
                {
                  $limit: 1
                }
              ],

              as: "Master"
            }
          },

          {
            $unwind: {
              path: "$Master",
              preserveNullAndEmptyArrays: true
            }
          },

          {
            $skip: skip
          },

          {
            $limit: limit
          }
        ])
        .toArray();

      res.json({
        success: true,
        totalRecords,
        page,
        limit,
        count: data.length,
        data
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });

    }
  }
);



router.get(
  "/test-inward",
  async (req, res) => {

    try {

      const db =
        await connectMongo();

      const data = await db
        .collection("TInward")
        .findOne({});

      res.json(data);

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });

    }
  }
);



router.get("/count-inward", async (req, res) => {

  const db = await connectMongo();

  const count = await db
    .collection("TInward")
    .countDocuments();

  res.json({
    count
  });

});


router.get("/count-inwarddetails", async (req, res) => {

  const db = await connectMongo();

  const count = await db
    .collection("TInwardDetails")
    .countDocuments();

  res.json({
    count
  });

});






router.get("/test-inward-one", async (req, res) => {

  const db = await connectMongo();

  const data = await db
    .collection("TInward")
    .find({
      InwardNo: 1
    })
    .toArray();

  res.json(data);

});




router.get("/test-details-one", async (req, res) => {

  const db = await connectMongo();

  const data = await db
    .collection("TInwardDetails")
    .find({
      InwardNo: 1
    })
    .limit(5)
    .toArray();

  res.json(data);

});











router.get("/history-card", async (req, res) => {
  try {

    const gaugeNo = req.query.gaugeNo?.trim();
    const customerId = Number(req.query.customerId);

    if (!gaugeNo) {
      return res.status(400).json({
        success: false,
        message: "Gauge Code is required"
      });
    }

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required"
      });
    }

    const db = await connectMongo();

    //----------------------------------------------------
    // STEP 1 : Get all Inward Numbers of Logged-in Customer
    //----------------------------------------------------

    const inwardList = await db.collection("TInward")
      .find(
        { CustomerID: customerId },
        {
          projection: {
            _id: 0,
            InwardNo: 1
          }
        }
      )
      .toArray();

    if (inwardList.length === 0) {
      return res.json({
        success: true,
        header: null,
        history: []
      });
    }

    const inwardNos = inwardList.map(x => x.InwardNo);

    //----------------------------------------------------
    // STEP 2 : Search only customer's gauges
    //----------------------------------------------------

    const data = await db.collection("TInwardDetails").aggregate([

      {
        $match: {
          GaugeIDNo: gaugeNo,
          InwardNo: {
            $in: inwardNos
          }
        }
      },

      //------------------------------------------------
      // Convert Calibration Date
      //------------------------------------------------

      {
        $addFields: {
          CalibrationDate: {
            $dateFromString: {
              dateString: "$CalibratedOn",
              format: "%Y-%m-%d %H:%M:%S",
              onError: null,
              onNull: null
            }
          }
        }
      },

      //------------------------------------------------
      // SHOW ONLY 2025 ONWARDS
      //------------------------------------------------

     {
  $match: {
    CalibrationDate: {
      $gte: new Date("2026-01-01T00:00:00.000Z")
    }
  }
},

      //------------------------------------------------
      // Join Customer Inward
      //------------------------------------------------

      {
        $lookup: {
          from: "TInward",
          localField: "InwardNo",
          foreignField: "InwardNo",
          as: "Inward"
        }
      },

      {
        $unwind: {
          path: "$Inward",
          preserveNullAndEmptyArrays: true
        }
      },

      //------------------------------------------------
      // Customer Details
      //------------------------------------------------

      {
        $lookup: {
          from: "mCustomer",
          localField: "Inward.CustomerID",
          foreignField: "CustomerID",
          as: "CustomerInfo"
        }
      },

      {
        $unwind: {
          path: "$CustomerInfo",
          preserveNullAndEmptyArrays: true
        }
      },

      //------------------------------------------------
      // GI Type
      //------------------------------------------------

      {
        $lookup: {
          from: "mGIType",
          localField: "GITypeID",
          foreignField: "GITypeID",
          as: "GITypeInfo"
        }
      },

      {
        $unwind: {
          path: "$GITypeInfo",
          preserveNullAndEmptyArrays: true
        }
      },

      //------------------------------------------------
      // Remove Duplicate Certificates
      //------------------------------------------------

      {
        $group: {
          _id: {
            GaugeIDNo: "$GaugeIDNo",
            CalCertificateNo: "$CalCertificateNo"
          },
          doc: {
            $first: "$$ROOT"
          }
        }
      },

      {
        $replaceRoot: {
          newRoot: "$doc"
        }
      },

      //------------------------------------------------
      // Latest Calibration First
      //------------------------------------------------

      {
        $sort: {
          CalibrationDate: -1
        }
      },

      //------------------------------------------------
      // Final Output
      //------------------------------------------------

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
          CalibrationDate: 1,

          NextDueOn: 1,

          CalibrationResult: 1,

          CalCertificateNo: 1,

          CustomerInfo: 1,

          Inward: 1

        }
      }

    ]).toArray();

    console.log("=================================");
    console.log("Customer :", customerId);
    console.log("Gauge :", gaugeNo);
    console.log("Records :", data.length);
    console.log("=================================");

   const loginCustomer = await db.collection("mCustomer").findOne(
  {
    CustomerID: customerId
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
      GSTNo: 1
    }
  }
);

const header = data.length
  ? {
      ...data[0],
      CustomerInfo: loginCustomer
    }
  : null;
 
    const history = data;

    res.json({
      success: true,
      header,
      history
    });

  } catch (err) {

    console.error("History Card Error :", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


router.get("/history-gauges", async (req, res) => {
  try {

    console.log("====================================");
    console.log("========== HISTORY GAUGES ==========");

    const customerId = Number(req.query.customerId);

    console.log("Customer ID :", customerId);

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required"
      });
    }

    const db = await connectMongo();

    console.log("Mongo Connected");

    const gauges = await db.collection("TInwardDetails").aggregate([

      // Join with TInward
      {
        $lookup: {
          from: "TInward",
          localField: "InwardNo",
          foreignField: "InwardNo",
          as: "Inward"
        }
      },

      // Convert array to object
      {
        $unwind: "$Inward"
      },

      // Logged in customer's records only
      {
        $match: {
          "Inward.CustomerID": customerId
        }
      },

      // Ignore blank Gauge IDs
      {
        $match: {
          GaugeIDNo: {
            $exists: true,
            $ne: null,
            $ne: "",
            $ne: "-"
          }
        }
      },

      // Remove duplicate Gauge IDs
      {
        $group: {
          _id: "$GaugeIDNo"
        }
      },

      // Sort alphabetically
      {
        $sort: {
          _id: 1
        }
      },

      // Output format
      {
        $project: {
          _id: 0,
          GaugeIDNo: "$_id"
        }
      }

    ]).toArray();

    console.log("========== HISTORY DATA ==========");

console.table(
  data.map(item => ({
    GaugeIDNo: item.GaugeIDNo,
    InwardNo: item.InwardNo,
    CustomerID: item.Inward?.CustomerID,
    Certificate: item.CalCertificateNo,
    CalibratedOn: item.CalibratedOn,
    NextDueOn: item.NextDueOn
  }))
);

console.log("=================================");
console.log("Customer :", customerId);
console.log("Gauge :", gaugeNo);
console.log("Records :", data.length);
console.log("=================================");

    res.json({
      success: true,
      count: gauges.length,
      data: gauges
    });

  } catch (err) {

    console.log("====================================");
    console.log("History Gauges Error");
    console.log(err);
    console.log("====================================");

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});






router.get("/master-list", async (req, res) => {
  try {
    console.log("========== MASTER LIST ==========");

    const customerId = Number(req.query.customerId);

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required"
      });
    }

    const db = await connectMongo();

    // Get Customer Inwards
    const inwards = await db.collection("TInward")
      .find(
        { CustomerID: customerId },
        {
          projection: {
            _id: 0,
            InwardNo: 1,
            InwardDate: 1
          }
        }
      )
      .toArray();

    console.log("Customer :", customerId);
    console.log("Customer Inwards :", inwards.length);

    if (inwards.length === 0) {
      return res.json({
        success: true,
        count: 0,
        data: []
      });
    }

    const inwardConditions = inwards.map(item => ({
      InwardNo: item.InwardNo,
      InwardDate: item.InwardDate
    }));

    const data = await db.collection("TInwardDetails")
      .aggregate([

        // Customer Records
        {
          $match: {
            $or: inwardConditions,
            GaugeIDNo: {
              $nin: [null, "", "-", "--"]
            }
          }
        },

        // Convert String Date to Date
        {
          $addFields: {
            CalibrationDate: {
              $dateFromString: {
                dateString: "$CalibratedOn",
                format: "%Y-%m-%d %H:%M:%S",
                onError: null,
                onNull: null
              }
            }
          }
        },

        // Only 01/01/2026 onward
        {
          $match: {
            CalibrationDate: {
              $gte: new Date("2026-01-01")
            }
          }
        },

        // Latest Calibration First
        {
          $sort: {
            CalibrationDate: -1
          }
        },

        // Keep Latest Record of Each Gauge
        {
          $group: {
            _id: {
              $trim: {
                input: {
                  $replaceAll: {
                    input: "$GaugeIDNo",
                    find: ",",
                    replacement: ""
                  }
                }
              }
            },
            doc: {
              $first: "$$ROOT"
            }
          }
        },

        {
          $replaceRoot: {
            newRoot: "$doc"
          }
        },

        // Description
        {
          $lookup: {
            from: "mGIType",
            localField: "GITypeID",
            foreignField: "GITypeID",
            as: "GIType"
          }
        },

        {
          $unwind: {
            path: "$GIType",
            preserveNullAndEmptyArrays: true
          }
        },

        // Final Output
        {
          $project: {
            _id: 0,

            InwardNo: 1,
            InwardDate: 1,
            LABIDNo: 1,

            GaugeIDNo: {
              $trim: {
                input: {
                  $replaceAll: {
                    input: "$GaugeIDNo",
                    find: ",",
                    replacement: ""
                  }
                }
              }
            },

            GITypeID: 1,
            Description: "$GIType.GIType",

            Make: 1,

            GIRangeFrom: 1,
            GIRangeTo: 1,
            GIRangeUnit: 1,

            GILC: 1,
            GILCUnit: 1,

            STDSpecification: 1,

            GoSize: 1,
            NoGoSize: 1,
            SizeUnit: 1,

            Series: 1,
            Size: 1,
            Pitch: 1,
            Class: 1,
            LHRH: 1,
            Special: 1,

            CalibratedOn: 1,
            NextDueOn: 1,
            Remark: 1
          }
        },

        // Sort by Code No
        {
          $sort: {
            GaugeIDNo: 1
          }
        }

      ])
      .toArray();

    console.log("Master Records :", data.length);

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {

    console.error("MASTER LIST ERROR :", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;