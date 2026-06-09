// const express = require("express");
// const router = express.Router();

// const connectDB = require("../config/db");

// // Password Access Route
// router.post("/access", async (req, res) => {
//   try {
//     const { password } = req.body;

//     if (password !== "suvarn") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Database Connected Successfully",
//       tables: [
//         "mBank",
//         "mCalibrationAgency",
//         "mCalibrationRate",
//       ],
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // Dynamic Table Route
// router.get("/table/:tableName", async (req, res) => {
//   try {

//     const { tableName } = req.params;

//     const db = await connectDB();

//     const result = await db.query(
//       `SELECT * FROM [${tableName}]`
//     );

//     res.status(200).json({
//       success: true,
//       data: result,
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// });

// // mBank
// router.get("/mbank", async (req, res) => {
//   try {

//     const db = await connectDB();

//     const result = await db.query(
//       "SELECT * FROM mBank"
//     );

//     res.json(result);

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }
// });

// // Agency
// router.get("/agency", async (req, res) => {
//   try {

//     const db = await connectDB();

//     const result = await db.query(
//       "SELECT * FROM mCalibrationAgency"
//     );

//     res.json(result);

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }
// });

// // Rate
// router.get("/rate", async (req, res) => {
//   try {

//     const db = await connectDB();

//     const result = await db.query(
//       "SELECT * FROM mCalibrationRate"
//     );

//     res.json(result);

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }
// });

// module.exports = router;


















































// const express = require("express");
// const router = express.Router();

// const connectDB = require("../config/db");

// // Password Access Route
// router.post("/access", async (req, res) => {
//   try {
//     const { password } = req.body;

//     if (password !== "suvarn") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     const db = await connectDB();

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
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // Get Collection Data Dynamically
// router.get("/table/:tableName", async (req, res) => {
//   try {

//     const { tableName } = req.params;

//     const db = await connectDB();

//     const data = await db
//       .collection(tableName)
//       .find({})
//       .toArray();

//     res.status(200).json({
//       success: true,
//       count: data.length,
//       data,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// });

// // Get All Collection Names
// router.get("/tables", async (req, res) => {
//   try {

//     const db = await connectDB();

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

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// });

// module.exports = router;













// const express = require("express");
// const router = express.Router();

// const connectMongo = require("../config/mongoDB");


// // PASSWORD LOGIN

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

//     const collections =
//       await db
//         .listCollections()
//         .toArray();

//     const tables =
//       collections.map(
//         (item) => item.name
//       );

//     res.status(200).json({
//       success: true,
//       message:
//         "Database Connected Successfully",
//       tables,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// });


// // GET TABLE DATA

// router.get(
//   "/table/:tableName",
//   async (req, res) => {

//     try {

//       const db =
//         await connectMongo();

//       const data =
//         await db
//           .collection(
//             req.params.tableName
//           )
//           .find({})
//           .limit(1000)
//           .toArray();

//       res.status(200).json({
//         success: true,
//         count: data.length,
//         data,
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message:
//           error.message,
//       });

//     }

//   }
// );


// // GET ALL TABLES

// router.get(
//   "/tables",
//   async (req, res) => {

//     try {

//       const db =
//         await connectMongo();

//       const collections =
//         await db
//           .listCollections()
//           .toArray();

//       const tables =
//         collections.map(
//           (item) => item.name
//         );

//       res.status(200).json({
//         success: true,
//         tables,
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message:
//           error.message,
//       });

//     }

//   }
// );

// module.exports = router;























// const express = require("express");
// const router = express.Router();

// const connectMongo = require("../config/db");

// // LOGIN

// router.post("/access", async (req, res) => {
// try {

// ```
// const { password } = req.body;

// if (password !== "suvarn") {
//   return res.status(401).json({
//     success: false,
//     message: "Invalid Password",
//   });
// }

// const db = await connectMongo();

// const collections = await db
//   .listCollections()
//   .toArray();

// const tables = collections.map(
//   (item) => item.name
// );

// res.status(200).json({
//   success: true,
//   message: "Database Connected Successfully",
//   tables,
// });
// ```

// } catch (error) {

// ```
// console.log(error);

// res.status(500).json({
//   success: false,
//   message: error.message,
// });
// ```

// }
// });

// // GET TABLE DATA

// router.get("/table/:tableName", async (req, res) => {
// try {

// ```
// const db = await connectMongo();

// const tableName =
//   req.params.tableName;

// const data = await db
//   .collection(tableName)
//   .find({})
//   .limit(1000)
//   .toArray();

// res.status(200).json({
//   success: true,
//   count: data.length,
//   data,
// });
// ```

// } catch (error) {

// ```
// console.log(error);

// res.status(500).json({
//   success: false,
//   message: error.message,
// });
// ```

// }
// });

// // GET ALL TABLES

// router.get("/tables", async (req, res) => {
// try {

// ```
// const db = await connectMongo();

// const collections = await db
//   .listCollections()
//   .toArray();

// const tables = collections.map(
//   (item) => item.name
// );

// res.status(200).json({
//   success: true,
//   tables,
// });
// ```

// } catch (error) {

// ```
// console.log(error);

// res.status(500).json({
//   success: false,
//   message: error.message,
// });
// ```

// }
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

    const data = await db
      .collection(tableName)
      .find({})
      .limit(1000)
      .toArray();

    res.status(200).json({
      success: true,
      count: data.length,
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

module.exports = router;