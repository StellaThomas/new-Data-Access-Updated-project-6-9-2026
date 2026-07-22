const odbc = require("odbc");

async function checkObjects() {

  try {

    const db = await odbc.connect(
      "DSN=RCLAccess;PWD=suvarn;"
    );

    console.log("Connected\n");

   const objects = await db.tables(
  null,
  null,
  "%",
  null
);

console.table(objects);

    console.log(objects);

    await db.close();

  } catch (err) {

    console.log(err);

  }

}

checkObjects();