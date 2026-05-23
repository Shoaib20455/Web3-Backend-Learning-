const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Token banane ka helper function (Perfect!)
function createToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ─── REGISTER ─────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Manual check (For quick response)
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    // 2. Safe Way: new instance bana kar save karna taake pre('save') lazmi chale
    const user = new User({ email, password });
    await user.save();

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
    // Agar race condition ki wajah se DB level par duplicate error aaye
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already registered!" });
    }
    res.status(500).json({ error: error.message });
  }
});

// ─── LOGIN ────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // User dhundo (email ko lowercase/trim karna safe rehta hai)
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: "Email ya password galat hai!" });
    }

    // Password check karo (Instance method use kiya, perfect!)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email ya password galat hai!" });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;