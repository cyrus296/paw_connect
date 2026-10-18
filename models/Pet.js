const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet name is required"],
      trim: true,
    },
    species: {
      type: String,
      required: [true, "Species is required"],
      trim: true,
    },
    breed: {
      type: String,
      trim: true,
      default: "",
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 0,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner ID is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
