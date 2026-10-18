const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Service type is required"],
      enum: ["vet", "grooming", "food"],
    },
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
