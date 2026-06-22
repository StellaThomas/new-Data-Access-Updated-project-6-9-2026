

// const express = require("express");
// const router = express.Router();

// const connectMongo = require("../config/db");

// // LOGIN
// router.post("/access", async (req, res) => {
//   try {
//     const { password } = req.body;

//     if (password !== "suvarn") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     const db = await connectMongo();

//     const collections = await db
//       .listCollections()
//       .toArray();

//     const tables = collections.map(
//       (item) => item.name
//     );

//     res.status(200).json({
//       success: true,
//       message: "Database Connected Successfully",
//       tables,
//     });
//   } catch (error) {
//     console.log("ACCESS ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });


// // GET TABLE DATA
// router.get("/table/:tableName", async (req, res) => {
//   try {
//     const { tableName } = req.params;

//     const db = await connectMongo();

//     // Total Records Count
//     const totalCount = await db
//       .collection(tableName)
//       .countDocuments();

//     // Get ALL Records
//     const data = await db
//       .collection(tableName)
//       .find({})
//       .toArray();

//     console.log("Collection:", tableName);
//     console.log("Total Count:", totalCount);
//     console.log("Data Length:", data.length);

//     res.status(200).json({
//       success: true,
//       count: totalCount,
//       data,
//     });

//   } catch (error) {
//     console.log("TABLE ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // GET ALL TABLES
// router.get("/tables", async (req, res) => {
//   try {
//     const db = await connectMongo();

//     const collections = await db
//       .listCollections()
//       .toArray();

//     const tables = collections.map(
//       (item) => item.name
//     );

//     res.status(200).json({
//       success: true,
//       tables,
//     });
//   } catch (error) {
//     console.log("TABLE LIST ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// module.exports = router;













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
              InwardNo: inwardNo
            }
          },

          {
            $lookup: {
              from: "TInward",
              localField: "InwardNo",
              foreignField: "InwardNo",
              as: "InwardMaster"
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









//HISTORY CARD API



// router.get("/history-card", async (req, res) => {
//   try {

//     const customerId = Number(req.query.customerId);
//     const gaugeNo = req.query.gaugeNo;

//     const db = await connectMongo();

//     const data = await db
//       .collection("TInwardDetails")
//       .aggregate([
//         {
//           $match: {
//             LABIDNo: gaugeNo
//           }
//         },

//         {
//           $lookup: {
//             from: "TInward",

//             let: {
//               inwardNo: "$InwardNo"
//             },

//             pipeline: [
//               {
//                 $match: {
//                   $expr: {
//                     $and: [
//                       {
//                         $eq: [
//                           "$InwardNo",
//                           "$$inwardNo"
//                         ]
//                       },
//                       {
//                         $eq: [
//                           "$CustomerID",
//                           customerId
//                         ]
//                       }
//                     ]
//                   }
//                 }
//               },
//               {
//                 $limit: 1
//               }
//             ],

//             as: "Master"
//           }
//         },

//         {
//           $unwind: {
//             path: "$Master",
//             preserveNullAndEmptyArrays: true
//           }
//         },

//         {
//           $lookup: {
//             from: "mCustomer",

//             let: {
//               custId: "$Master.CustomerID"
//             },

//             pipeline: [
//               {
//                 $match: {
//                   $expr: {
//                     $eq: [
//                       "$CustomerID",
//                       "$$custId"
//                     ]
//                   }
//                 }
//               },
//               {
//                 $limit: 1
//               }
//             ],

//             as: "CustomerInfo"
//           }
//         },

//         {
//           $unwind: {
//             path: "$CustomerInfo",
//             preserveNullAndEmptyArrays: true
//           }
//         },

//         {
//           $sort: {
//             CalibratedOn: 1
//           }
//         }
//       ])
//       .toArray();

//     console.log(
//       "FIRST RECORD = ",
//       JSON.stringify(data[0], null, 2)
//     );

//     res.json({
//       success: true,
//       count: data.length,
//       data
//     });

//   } catch (err) {

//     console.log(
//       "HISTORY CARD ERROR:",
//       err
//     );

//     res.status(500).json({
//       success: false,
//       message: err.message
//     });

//   }
// });


// router.get("/history-card", async (req, res) => {
//   try {
//     const customerId = Number(req.query.customerId);
//     const gaugeNo = req.query.gaugeNo?.trim();

//     const db = await connectMongo();

//     const data = await db
//       .collection("TInwardDetails")
//       .aggregate([
//         {
//           $match: {
//             LABIDNo: gaugeNo
//           }
//         },

//         {
//           $lookup: {
//             from: "TInward",
//             let: {
//               inwardNo: "$InwardNo",
//               inwardDate: "$InwardDate"
//             },
//             pipeline: [
//               {
//                 $match: {
//                   $expr: {
//                     $and: [
//                       { $eq: ["$InwardNo", "$$inwardNo"] },
//                       { $eq: ["$InwardDate", "$$inwardDate"] },
//                       { $eq: ["$CustomerID", customerId] }
//                     ]
//                   }
//                 }
//               }
//             ],
//             as: "Master"
//           }
//         },

//         {
//           $unwind: {
//             path: "$Master",
//             preserveNullAndEmptyArrays: false
//           }
//         },

//         {
//           $lookup: {
//             from: "mCustomer",
//             localField: "Master.CustomerID",
//             foreignField: "CustomerID",
//             as: "CustomerInfo"
//           }
//         },

//         {
//           $unwind: {
//             path: "$CustomerInfo",
//             preserveNullAndEmptyArrays: true
//           }
//         },

//         {
//           $sort: {
//             CalibratedOn: 1
//           }
//         }
//       ])
//       .toArray();

//     console.log("=================================");
//     console.log("Customer ID =", customerId);
//     console.log("Gauge Code =", gaugeNo);
//     console.log("Records Found =", data.length);
//     console.log("=================================");

//     res.json({
//       success: true,
//       count: data.length,
//       data
//     });

//   } catch (err) {
//     console.log("HISTORY CARD ERROR =", err);

//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// });





router.get("/history-card", async (req, res) => {
  try {
    const gaugeNo = req.query.gaugeNo?.trim();

    const db = await connectMongo();

    const data = await db
      .collection("TInwardDetails")
      .aggregate([
        {
          $match: {
            LABIDNo: gaugeNo
          }
        },

        {
          $sort: {
            CalibratedOn: 1
          }
        }
      ])
      .toArray();

    console.log("=================================");
    console.log("Gauge Code =", gaugeNo);
    console.log("Records Found =", data.length);

    if (data.length > 0) {
      console.log("FIRST RECORD =", data[0]);
    }

    console.log("=================================");

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.log("HISTORY CARD ERROR =", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;