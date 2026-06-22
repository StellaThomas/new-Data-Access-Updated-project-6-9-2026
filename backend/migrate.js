

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
//       "mongodb://127.0.0.1:27017",
//       {
//         maxPoolSize: 20,
//         serverSelectionTimeoutMS: 30000,
//         socketTimeoutMS: 600000,
//       }
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

//     console.log(
//       `\n📊 Total Tables Found: ${tables.length}\n`
//     );

//     for (const table of tables) {
//       const tableName = table.TABLE_NAME;

//       try {
//         console.log(
//           `\n📦 Importing: ${tableName}`
//         );

//         const records = await accessDB.query(
//           `SELECT * FROM [${tableName}]`
//         );

//         console.log(
//           `📄 Records Found: ${records.length}`
//         );

//         // Clear Collection
//         await mongoDB
//           .collection(tableName)
//           .deleteMany({});

//         if (records.length === 0) {
//           console.log(
//             `⚠️ ${tableName} Empty Table`
//           );
//           continue;
//         }

//         const batchSize = 5000;

//         for (
//           let i = 0;
//           i < records.length;
//           i += batchSize
//         ) {
//           const batch = records.slice(
//             i,
//             i + batchSize
//           );

//           await mongoDB
//             .collection(tableName)
//             .insertMany(batch);

//           console.log(
//             `   Inserted ${Math.min(
//               i + batchSize,
//               records.length
//             )}/${records.length}`
//           );
//         }

//         console.log(
//           `✅ ${tableName} Imported`
//         );

//       } catch (err) {
//         console.log(
//           `❌ Error Importing ${tableName}`
//         );

//         console.log(err.message);
//       }
//     }

//     console.log(
//       "\n🎉 ALL TABLES IMPORTED SUCCESSFULLY"
//     );

//   } catch (error) {
//     console.log(
//       "\n❌ Migration Failed"
//     );

//     console.log(error);
//   } finally {
//     try {
//       if (accessDB) {
//         await accessDB.close();
//       }

//       if (mongoClient) {
//         await mongoClient.close();
//       }

//       console.log(
//         "\n🔒 Connections Closed"
//       );

//     } catch (err) {
//       console.log(err.message);
//     }
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

    const mongoDB = mongoClient.db(
      "RCLDatabase"
    );

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

// Skip TInwardDetails temporarily
// if (tableName === "TInwardDetails") {

//   console.log(
//     "⏭️ Skipping TInwardDetails Temporarily"
//   );

//   continue;
// }

let records = [];





        

        try {

          records =
            await accessDB.query(
              `SELECT * FROM [${tableName}]`
            );

        } catch (readErr) {

          console.log(
            `❌ Cannot Read ${tableName}`
          );

          console.log(
            readErr.message
          );

          continue;
        }

        console.log(
          `📄 Records Found: ${records.length}`
        );


try {

  await mongoDB.createCollection(
    tableName
  );

} catch (err) {
  // Collection already exists
}


        // Clear Existing Collection
        await mongoDB
          .collection(tableName)
          .deleteMany({});




        if (records.length === 0) {

          console.log(
            `⚠️ ${tableName} Empty Table`
          );

          continue;
        }

        // Batch Size
        const batchSize = 1000;

        for (
          let i = 0;
          i < records.length;
          i += batchSize
        ) {

          const batch =
            records.slice(
              i,
              i + batchSize
            );

          try {

            await mongoDB
              .collection(tableName)
              .insertMany(
                batch,
                {
                  ordered: false,
                }
              );

            console.log(
              `Inserted ${Math.min(
                i + batchSize,
                records.length
              )}/${records.length}`
            );

          } catch (insertErr) {

            console.log(
              `❌ Insert Error In ${tableName}`
            );

            console.log(
              insertErr.message
            );
          }
        }

        console.log(
          `✅ ${tableName} Imported`
        );

      } catch (err) {

        console.log(
          `❌ Error Importing ${tableName}`
        );

        console.log(
          err.message
        );
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

      console.log(
        err.message
      );
    }
  }
}

migrateAll();