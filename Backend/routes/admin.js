const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const Proposal = require("../models/Proposal");

// GET all proposals for admin
router.get("/proposals", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve a proposal
router.put("/proposals/:id/approve", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });

    proposal.status = "Approved";
    await proposal.save();

    res.json({ message: "Proposal approved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
