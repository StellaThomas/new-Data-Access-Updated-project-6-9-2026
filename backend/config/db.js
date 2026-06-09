// const odbc = require("odbc");

// const connectDB = async () => {
//   try {
//     const connection = await odbc.connect(
//       "Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
//       "Dbq=E:\\RCL\\Data\\eCalLab_be.mdb;" +
//       "PWD=suvarn;"
//     );

//     console.log("✅ Database Connected");

//     return connection;
//   } catch (error) {
//     console.error("❌ Database Connection Error");
//     console.error(error);
//     throw error;
//   }
// };

// module.exports = connectDB;









































const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "RCLDatabase";

let db = null;

const connectDB = async () => {
  try {

    if (db) {
      return db;
    }

    const client = await MongoClient.connect(url);

    db = client.db(dbName);

    console.log("✅ MongoDB Connected");

    return db;

  } catch (error) {

    console.error("❌ MongoDB Connection Error");
    console.error(error);

    throw error;
  }
};

module.exports = connectDB;