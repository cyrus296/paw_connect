const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedInitialData = require("./seedData");

// Route imports
const userRoutes = require("./routes/users");
const petRoutes = require("./routes/pets");
const healthMetricRoutes = require("./routes/healthMetrics");
const serviceRoutes = require("./routes/services");

const app = express();
const PRIMARY_PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/health-metrics", healthMetricRoutes);
app.use("/api/services", serviceRoutes);

// Root health-check endpoint
app.get("/", (req, res) => {
  res.json({ message: "PawConnect API is running 🐾", status: "online" });
});

function startListening(port) {
  const server = app.listen(port, () => {
    console.log(`\n🐾  PawConnect server listening on http://localhost:${port}`);
    console.log(`    API Health Check: http://localhost:${port}/`);
    console.log(`    Services: http://localhost:${port}/api/services`);
    console.log(`    Health Metrics: http://localhost:${port}/api/health-metrics\n`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && port === 5000) {
      console.warn("\n⚠️   Port 5000 is occupied by macOS AirPlay Receiver.");
      console.log("👉  Automatically falling back to port 5001...");
      console.log("    (Tip: To free port 5000, go to Mac System Settings > AirDrop & AirPlay > turn off 'AirPlay Receiver')\n");
      startListening(5001);
    } else {
      console.error("Server error:", err.message);
    }
  });
}

// Connect to MongoDB, seed initial data, then start listening
connectDB()
  .then(async () => {
    await seedInitialData();
    startListening(PRIMARY_PORT);
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
