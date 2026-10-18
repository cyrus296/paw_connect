const mongoose = require("mongoose");

const healthMetricSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: [true, "Pet ID is required"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    heartRate: {
      type: Number,
      required: [true, "Heart rate is required"],
    },
    temperature: {
      type: Number,
      required: [true, "Temperature is required"],
    },
    activityLevel: {
      type: String,
      required: [true, "Activity level is required"],
      enum: ["low", "moderate", "high"],
    },
    stressIndicator: {
      type: Boolean,
      default: false,
    },
    gps: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    accelerometer: {
      x: { type: Number },
      y: { type: Number },
      z: { type: Number },
    },
    gyroscope: {
      x: { type: Number },
      y: { type: Number },
      z: { type: Number },
    },
    anomalyType: {
      type: String,
      enum: ["fall", "tamper", null],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthMetric", healthMetricSchema);
