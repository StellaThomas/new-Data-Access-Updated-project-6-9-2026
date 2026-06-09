const odbc = require("odbc");

async function showTables() {
  try {
    const db = await odbc.connect(
      "DSN=RCLAccess;PWD=suvarn;"
    );

    console.log("✅ Connected");

    const tables = await db.tables(
      null,
      null,
      "%",
      "TABLE"
    );

    console.log(tables);

    await db.close();

  } catch (err) {
    console.error(err);
  }
}

showTables();