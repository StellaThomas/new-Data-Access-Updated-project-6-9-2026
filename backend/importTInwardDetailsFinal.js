const odbc = require("odbc");
const { MongoClient } = require("mongodb");

async function importTInwardDetails() {

  let accessDB;
  let mongoClient;

  try {

    console.log("🚀 STARTED");

    accessDB = await odbc.connect(
      "DSN=RCLAccess;PWD=suvarn;"
    );

    console.log("✅ ACCESS CONNECTED");

    mongoClient = new MongoClient(
      "mongodb://127.0.0.1:27017"
    );

    await mongoClient.connect();

    console.log("✅ MONGODB CONNECTED");

    const db = mongoClient.db(
      "RCLDatabase"
    );

    // Delete old collection
    await db
      .collection("TInwardDetails")
      .deleteMany({});

    console.log(
      "🗑️ Old Data Deleted"
    );

    // Import InwardNo wise
    for (
      let inwardNo = 1;
      inwardNo <= 263;
      inwardNo++
    ) {

      console.log(
        `\n📦 Importing InwardNo ${inwardNo}`
      );

      const records =
        await accessDB.query(
          `SELECT * FROM TInwardDetails WHERE InwardNo=${inwardNo}`
        );

      console.log(
        `Records: ${records.length}`
      );

      if (records.length > 0) {

        await db
          .collection("TInwardDetails")
          .insertMany(
            records,
            {
              ordered: false
            }
          );

        console.log(
          `✅ Imported ${records.length}`
        );
      }
    }

    const total =
      await db
        .collection("TInwardDetails")
        .countDocuments();

    console.log(
      `\n🎉 IMPORT COMPLETED`
    );

    console.log(
      `Mongo Records: ${total}`
    );

  } catch (err) {

    console.log(
      "❌ ERROR"
    );

    console.log(err);

  } finally {

    try {

      if (accessDB)
        await accessDB.close();

      if (mongoClient)
        await mongoClient.close();

      console.log(
        "\n🔒 Connections Closed"
      );

    } catch (err) {
      console.log(err);
    }
  }
}

importTInwardDetails();