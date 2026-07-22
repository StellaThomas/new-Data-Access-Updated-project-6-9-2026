

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const dataRoutes = require("./routes/dataRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

// Parse JSON first
app.use(express.json());

// Serve PDF files
app.use(
  "/certificates",
  express.static(path.join(__dirname, "certificates"))
);

// Routes
app.use("/api", authRoutes);
app.use("/api", dataRoutes);

app.get("/", (req, res) => {
  res.send("MDB Backend Running...");
});

connectDB()
  .then(() => {
    console.log("✅ Database Ready");
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});