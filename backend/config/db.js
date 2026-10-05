
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










