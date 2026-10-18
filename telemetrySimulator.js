/**
 * PawConnect — Telemetry Simulator
 *
 * Simulates a multi-sensor wearable tag (accelerometer, gyroscope, GPS,
 * temperature) and pushes a HealthMetric document to MongoDB every 5 seconds.
 *
 * Usage:
 *   node telemetrySimulator.js <petId>
 *
 * Example:
 *   node telemetrySimulator.js 664f1e2a3b4c5d6e7f8a9b0c
 */

const mongoose = require("mongoose");
const HealthMetric = require("./models/HealthMetric");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const MONGO_URI = "mongodb://127.0.0.1:27017/pawconnect";
const INTERVAL_MS = 5000; // emit every 5 seconds
const ANOMALY_CHANCE = 0.05; // 5 % probability per tick

// Base GPS anchor — drifts slightly each tick to simulate movement
const BASE_LAT = 37.7749; // San Francisco
const BASE_LNG = -122.4194;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Random float in [min, max] rounded to `decimals` places. */
function rand(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

/** Random integer in [min, max]. */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Pick a random element from an array. */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Payload generators
// ---------------------------------------------------------------------------

/**
 * Generates a normal telemetry payload with realistic ranges:
 *   Heart rate : 70 – 120 bpm
 *   Temperature: 100 – 102.5 °F
 *   Accel / Gyro: small noise around resting values
 *   GPS        : slight drift around the base anchor
 */
function generateNormalPayload(petId) {
  return {
    petId,
    timestamp: new Date(),
    heartRate: randInt(70, 120),
    temperature: rand(100, 102.5, 1),
    activityLevel: pick(["low", "moderate", "high"]),
    stressIndicator: false,
    gps: {
      latitude: rand(BASE_LAT - 0.002, BASE_LAT + 0.002, 6),
      longitude: rand(BASE_LNG - 0.002, BASE_LNG + 0.002, 6),
    },
    accelerometer: {
      x: rand(-1, 1, 3),
      y: rand(-1, 1, 3),
      z: rand(9.5, 10.0, 3), // ~1 g resting
    },
    gyroscope: {
      x: rand(-5, 5, 2),
      y: rand(-5, 5, 2),
      z: rand(-5, 5, 2),
    },
    anomalyType: null,
  };
}

/**
 * Generates an anomaly payload that simulates a detected fall or tamper event.
 * Vitals spike, accelerometer / gyro readings go extreme.
 */
function generateAnomalyPayload(petId) {
  const anomalyType = pick(["fall", "tamper"]);

  const payload = {
    petId,
    timestamp: new Date(),
    // Spiked vitals
    heartRate: randInt(150, 200),
    temperature: rand(103, 106, 1),
    activityLevel: "high",
    stressIndicator: true,
    gps: {
      latitude: rand(BASE_LAT - 0.002, BASE_LAT + 0.002, 6),
      longitude: rand(BASE_LNG - 0.002, BASE_LNG + 0.002, 6),
    },
    anomalyType,
  };

  if (anomalyType === "fall") {
    // Sudden high-g impact followed by near-zero orientation change
    payload.accelerometer = {
      x: rand(-15, 15, 3),
      y: rand(-15, 15, 3),
      z: rand(0, 3, 3), // loss of normal 1 g
    };
    payload.gyroscope = {
      x: rand(-250, 250, 2),
      y: rand(-250, 250, 2),
      z: rand(-250, 250, 2),
    };
  } else {
    // Tamper: sustained irregular vibrations
    payload.accelerometer = {
      x: rand(-8, 8, 3),
      y: rand(-8, 8, 3),
      z: rand(5, 14, 3),
    };
    payload.gyroscope = {
      x: rand(-180, 180, 2),
      y: rand(-180, 180, 2),
      z: rand(-180, 180, 2),
    };
  }

  return payload;
}

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------

async function main() {
  const connectDB = require("./config/db");
  const Pet = require("./models/Pet");

  // Connect to MongoDB
  await connectDB();

  let petId = process.argv[2];

  if (!petId) {
    const pet = await Pet.findOne();
    if (pet) {
      petId = pet._id.toString();
      console.log(`💡  Auto-detected default pet: ${pet.name} (${petId})`);
    } else {
      console.error("❌  No pets found in database. Create a pet or specify petId: node telemetrySimulator.js <petId>");
      process.exit(1);
    }
  }

  // Validate that petId looks like a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(petId)) {
    console.error(`"${petId}" is not a valid MongoDB ObjectId.`);
    process.exit(1);
  }

  console.log(`🐾  Telemetry simulator started for pet ${petId}`);
  console.log(`    Emitting every ${INTERVAL_MS / 1000}s — anomaly chance ${ANOMALY_CHANCE * 100}%`);
  console.log("    Press Ctrl+C to stop.\n");

  let tickCount = 0;

  const interval = setInterval(async () => {
    tickCount++;
    const isAnomaly = Math.random() < ANOMALY_CHANCE;
    const payload = isAnomaly
      ? generateAnomalyPayload(petId)
      : generateNormalPayload(petId);

    try {
      const doc = await HealthMetric.create(payload);

      const tag = isAnomaly
        ? `⚠️  ANOMALY [${payload.anomalyType.toUpperCase()}]`
        : `✔  NORMAL`;

      console.log(
        `[#${String(tickCount).padStart(4, "0")}] ${tag}  ` +
          `HR=${payload.heartRate} bpm  ` +
          `T=${payload.temperature} °F  ` +
          `Activity=${payload.activityLevel}  ` +
          `Stress=${payload.stressIndicator}  ` +
          `GPS=(${payload.gps.latitude}, ${payload.gps.longitude})  ` +
          `id=${doc._id}`
      );
    } catch (err) {
      console.error(`[#${String(tickCount).padStart(4, "0")}] DB write failed:`, err.message);
    }
  }, INTERVAL_MS);

  // Graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\n🛑  Shutting down simulator…");
    clearInterval(interval);
    await mongoose.disconnect();
    console.log("   Disconnected from MongoDB. Bye!");
    process.exit(0);
  });
}

main();
