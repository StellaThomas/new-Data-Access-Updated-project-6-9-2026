const express = require("express");
const cors = require("cors");

const dataRoutes = require("./routes/dataRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MDB Backend Running...");
});

app.use("/api", dataRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});