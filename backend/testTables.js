const odbc = require("odbc");

async function getTables() {
  try {
    const connection = await odbc.connect("DSN=RCLAccess");

    const tables = await connection.tables();

    console.log(tables);

    await connection.close();
  } catch (err) {
    console.error(err);
  }
}

getTables();