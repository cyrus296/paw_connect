const mongoose = require("mongoose");

let mongod = null;

const connectDB = async () => {
  const localUri = "mongodb://127.0.0.1:27017/pawconnect";

  // 1. Try local MongoDB first (with a short 1.5s timeout)
  try {
    const conn = await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 1500,
    });
    console.log(`✅  Connected to local MongoDB (${conn.connection.host})`);
    return;
  } catch (err) {
    console.log("ℹ️   Local MongoDB not detected on port 27017.");
  }

  // 2. Seamless in-memory MongoDB fallback
  try {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();
    await mongoose.connect(memoryUri);
    console.log(`🚀  Started embedded in-memory MongoDB (${memoryUri})`);
    console.log("    (Telemetry and data will persist in memory for this session)");
  } catch (err) {
    console.error(`❌  Failed to connect to any MongoDB instance: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
