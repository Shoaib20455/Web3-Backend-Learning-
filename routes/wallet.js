// routes/wallet.js
const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");

// ─── CREATE ───────────────────────────────
// POST /wallets — naya wallet save karo
router.post("/", async (req, res) => {
  try {
    const { address, network } = req.body;

    const wallet = new Wallet({ address, network });
    await wallet.save();   // DB mein save karo

    res.status(201).json({
      success: true,
      data: wallet
    });

  } catch (error) {
    // Duplicate address ka error handle karo
    if (error.code === 11000) {
      return res.status(400).json({ error: "Wallet already exists!" });
    }
    res.status(500).json({ error: error.message });
  }
});

// ─── READ ALL ─────────────────────────────
// GET /wallets — saare wallets lao
router.get("/", async (req, res) => {
  try {
    const wallets = await Wallet.find();   // sab documents lao
    res.json({ success: true, count: wallets.length, data: wallets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── READ ONE ─────────────────────────────
// GET /wallets/0x123... — specific wallet dhundo
router.get("/:address", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({
      address: req.params.address.toLowerCase()
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet nahi mila!" });
    }

    res.json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── UPDATE ───────────────────────────────
// PUT /wallets/0x123... — balance update karo
router.put("/:address", async (req, res) => {
  try {
    const wallet = await Wallet.findOneAndUpdate(
      { address: req.params.address.toLowerCase() },
      { balance: req.body.balance },
      { new: true }   // updated document return karo
    );

    if (!wallet) {
      return res.status(404).json({ error: "Wallet nahi mila!" });
    }

    res.json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── DELETE ───────────────────────────────
// DELETE /wallets/0x123...
router.delete("/:address", async (req, res) => {
  try {
    await Wallet.findOneAndDelete({
      address: req.params.address.toLowerCase()
    });
    res.json({ success: true, message: "Wallet delete ho gaya!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;