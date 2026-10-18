const User = require("./models/User");
const Pet = require("./models/Pet");
const Service = require("./models/Service");
const HealthMetric = require("./models/HealthMetric");

async function seedInitialData() {
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    console.log("🌱  Seeding initial marketplace services...");
    await Service.insertMany([
      {
        type: "vet",
        name: "Comprehensive Vet Exam",
        description: "Full clinical vitals review, preventive vaccinations, and wellness consultation.",
        price: 85.0,
      },
      {
        type: "grooming",
        name: "Deluxe Spa & Grooming",
        description: "Hypoallergenic bath, coat de-shedding, nail clipping, and ear sanitization.",
        price: 55.0,
      },
      {
        type: "food",
        name: "NutriPaw Organic Blend (10kg)",
        description: "High-protein, grain-free canine blend rich in omega-3 fatty acids.",
        price: 42.99,
      },
    ]);
  }

  const petCount = await Pet.countDocuments();
  if (petCount === 0) {
    console.log("🌱  Seeding sample owner and pet...");
    const user = await User.create({
      name: "Alex Morgan",
      email: "alex@pawconnect.io",
      password: "password123",
    });

    const pet = await Pet.create({
      name: "Buddy",
      species: "Dog",
      breed: "Golden Retriever",
      age: 3,
      ownerId: user._id,
    });

    console.log(`🐾  Default Pet created: ${pet.name} (ID: ${pet._id})`);

    // Seed 15 initial readings so charts and recommendations immediately render data
    const metricCount = await HealthMetric.countDocuments();
    if (metricCount === 0) {
      console.log("🌱  Seeding initial telemetry vitals...");
      const now = Date.now();
      const initialMetrics = [];
      for (let i = 15; i >= 1; i--) {
        const time = new Date(now - i * 5000);
        initialMetrics.push({
          petId: pet._id,
          timestamp: time,
          heartRate: 85 + Math.floor(Math.random() * 20),
          temperature: +(101.0 + Math.random() * 0.8).toFixed(1),
          activityLevel: i % 3 === 0 ? "low" : i % 3 === 1 ? "moderate" : "high",
          stressIndicator: false,
          gps: {
            latitude: +(37.7749 + (Math.random() - 0.5) * 0.001).toFixed(6),
            longitude: +(-122.4194 + (Math.random() - 0.5) * 0.001).toFixed(6),
          },
          accelerometer: { x: 0.1, y: 0.2, z: 9.8 },
          gyroscope: { x: 0.5, y: -0.2, z: 0.1 },
          anomalyType: null,
        });
      }
      await HealthMetric.insertMany(initialMetrics);
    }

    return pet._id;
  }
}

module.exports = seedInitialData;
