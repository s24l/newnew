const express = require("express");
const router = express.Router();
const Proposal = require("../models/Proposal");

// Submit Proposal
router.post("/", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const username = req.user.username; // Extracted from authMiddleware
    const proposal = new Proposal({ title, description, date, username });
    await proposal.save();
    res.status(201).json({ message: "Proposal submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get All Proposals
router.get("/", async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
