// const odbc = require("odbc");
// const { MongoClient } = require("mongodb");

// async function migrateAll() {
//   let accessDB;
//   let mongoClient;

//   try {
//     // Access Database Connection
//     accessDB = await odbc.connect(
//       "DSN=RCLAccess;PWD=suvarn;"
//     );

//     console.log("✅ Access Connected");

//     // MongoDB Connection
//     mongoClient = new MongoClient(
//       "mongodb://127.0.0.1:27017"
//     );

//     await mongoClient.connect();

//     console.log("✅ MongoDB Connected");

//     const mongoDB = mongoClient.db("RCLDatabase");

//     // Get All Tables
//     const tables = await accessDB.tables(
//       null,
//       null,
//       "%",
//       "TABLE"
//     );

//     console.log(`\n📊 Total Tables Found: ${tables.length}\n`);

//     for (const table of tables) {
//       const tableName = table.TABLE_NAME;

//       try {
//         console.log(`📦 Importing: ${tableName}`);

//         const records = await accessDB.query(
//           `SELECT * FROM [${tableName}]`
//         );

//         console.log(
//           `   Records Found: ${records.length}`
//         );

//         // Collection clean
//         await mongoDB
//           .collection(tableName)
//           .deleteMany({});

//         if (records.length > 0) {
//           await mongoDB
//             .collection(tableName)
//             .insertMany(records);

//           console.log(
//             `   ✅ ${tableName} Imported`
//           );
//         } else {
//           console.log(
//             `   ⚠️ Empty Table`
//           );
//         }

//       } catch (err) {
//         console.log(
//           `   ❌ Error Importing ${tableName}`
//         );
//         console.log(err.message);
//       }
//     }

//     console.log(
//       "\n🎉 ALL TABLES IMPORTED SUCCESSFULLY"
//     );

//   } catch (error) {
//     console.log("❌ Migration Error");
//     console.log(error);
//   } finally {
//     if (accessDB) await accessDB.close();
//     if (mongoClient) await mongoClient.close();
//   }
// }

// migrateAll();



































const odbc = require("odbc");
const { MongoClient } = require("mongodb");

async function migrateAll() {
  let accessDB;
  let mongoClient;

  try {
    // Access Database Connection
    accessDB = await odbc.connect(
      "DSN=RCLAccess;PWD=suvarn;"
    );

    console.log("✅ Access Connected");

    // MongoDB Connection
    mongoClient = new MongoClient(
      "mongodb://127.0.0.1:27017",
      {
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 600000,
      }
    );

    await mongoClient.connect();

    console.log("✅ MongoDB Connected");

    const mongoDB = mongoClient.db("RCLDatabase");

    // Get All Tables
    const tables = await accessDB.tables(
      null,
      null,
      "%",
      "TABLE"
    );

    console.log(
      `\n📊 Total Tables Found: ${tables.length}\n`
    );

    for (const table of tables) {
      const tableName = table.TABLE_NAME;

      try {
        console.log(
          `\n📦 Importing: ${tableName}`
        );

        const records = await accessDB.query(
          `SELECT * FROM [${tableName}]`
        );

        console.log(
          `📄 Records Found: ${records.length}`
        );

        // Clear Collection
        await mongoDB
          .collection(tableName)
          .deleteMany({});

        if (records.length === 0) {
          console.log(
            `⚠️ ${tableName} Empty Table`
          );
          continue;
        }

        const batchSize = 5000;

        for (
          let i = 0;
          i < records.length;
          i += batchSize
        ) {
          const batch = records.slice(
            i,
            i + batchSize
          );

          await mongoDB
            .collection(tableName)
            .insertMany(batch);

          console.log(
            `   Inserted ${Math.min(
              i + batchSize,
              records.length
            )}/${records.length}`
          );
        }

        console.log(
          `✅ ${tableName} Imported`
        );

      } catch (err) {
        console.log(
          `❌ Error Importing ${tableName}`
        );

        console.log(err.message);
      }
    }

    console.log(
      "\n🎉 ALL TABLES IMPORTED SUCCESSFULLY"
    );

  } catch (error) {
    console.log(
      "\n❌ Migration Failed"
    );

    console.log(error);
  } finally {
    try {
      if (accessDB) {
        await accessDB.close();
      }

      if (mongoClient) {
        await mongoClient.close();
      }

      console.log(
        "\n🔒 Connections Closed"
      );

    } catch (err) {
      console.log(err.message);
    }
  }
}

migrateAll();