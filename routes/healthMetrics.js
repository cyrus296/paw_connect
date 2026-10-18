const express = require("express");
const router = express.Router();
const HealthMetric = require("../models/HealthMetric");

// GET /api/health-metrics — List all health metrics (populates pet info)
router.get("/", async (req, res) => {
  try {
    const metrics = await HealthMetric.find()
      .populate("petId", "name species")
      .sort({ timestamp: -1 });
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/health-metrics/:id — Get a single health metric
router.get("/:id", async (req, res) => {
  try {
    const metric = await HealthMetric.findById(req.params.id).populate(
      "petId",
      "name species"
    );
    if (!metric)
      return res.status(404).json({ message: "Health metric not found" });
    res.json(metric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/health-metrics — Create a new health metric
router.post("/", async (req, res) => {
  try {
    const metric = await HealthMetric.create(req.body);
    res.status(201).json(metric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/health-metrics/:id — Update a health metric
router.put("/:id", async (req, res) => {
  try {
    const metric = await HealthMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!metric)
      return res.status(404).json({ message: "Health metric not found" });
    res.json(metric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/health-metrics/:id — Delete a health metric
router.delete("/:id", async (req, res) => {
  try {
    const metric = await HealthMetric.findByIdAndDelete(req.params.id);
    if (!metric)
      return res.status(404).json({ message: "Health metric not found" });
    res.json({ message: "Health metric deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
