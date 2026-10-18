const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// GET /api/pets — List all pets (populates owner info)
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find().populate("ownerId", "name email");
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/pets/:id — Get a single pet
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate(
      "ownerId",
      "name email"
    );
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/pets — Create a new pet
router.post("/", async (req, res) => {
  try {
    const petData = { ...req.body };
    if (!petData.ownerId) {
      const User = require("../models/User");
      const defaultUser = await User.findOne();
      if (defaultUser) {
        petData.ownerId = defaultUser._id;
      }
    }
    const pet = await Pet.create(petData);
    const populated = await Pet.findById(pet._id).populate("ownerId", "name email");
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/pets/:id — Update a pet
router.put("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/pets/:id — Delete a pet
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ message: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
