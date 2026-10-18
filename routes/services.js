const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// GET /api/services — List all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/:id — Get a single service
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/services — Create a new service
router.post("/", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/services/:id — Update a service
router.put("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service)
      return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/services/:id — Delete a service
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
