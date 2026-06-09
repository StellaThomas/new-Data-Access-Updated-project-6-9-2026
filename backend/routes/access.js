 const express = require("express");
const router = express.Router();

const connectDB = require("../config/db");
const connectMongo = require("../config/mongoDB");


// Password Access
router.post("/access", async (req, res) => {
  try {
    const { password } = req.body;

    console.log("Password:", password);

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

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// =========================
// ACCESS TABLE DATA
// =========================

router.get(
  "/table/:tableName",
  async (req, res) => {

    try {

      const { tableName } =
        req.params;

      const db =
        await connectDB();

      const result =
        await db.query(
          `SELECT * FROM [${tableName}]`
        );

      res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);


// =========================
// MONGODB COLLECTIONS
// =========================

router.get(
  "/collections",
  async (req, res) => {

    try {

      const db =
        await connectMongo();

      const collections =
        await db
          .listCollections()
          .toArray();

      const names =
        collections.map(
          (item) => item.name
        );

      res.status(200).json(
        names
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);


// =========================
// MONGODB COLLECTION DATA
// =========================

router.get(
  "/mongodb/:collectionName",
  async (req, res) => {

    try {

      const db =
        await connectMongo();

      const collectionName =
        req.params.collectionName;

      const data =
        await db
          .collection(
            collectionName
          )
          .find({})
.limit(5000)
.toArray();

      res.status(200).json(
        data
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);


// =========================

module.exports = router;