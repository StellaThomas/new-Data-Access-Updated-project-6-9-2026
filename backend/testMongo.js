const { MongoClient } = require("mongodb");

async function test() {
  try {
    const client = new MongoClient(
      "mongodb://127.0.0.1:27017"
    );

    await client.connect();

    console.log("✅ MongoDB Connected");

    await client.close();
  } catch (err) {
    console.error("❌ ERROR");
    console.error(err);
  }
}

test();