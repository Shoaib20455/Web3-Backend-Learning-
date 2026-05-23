// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  try {
    // Token header mein aata hai: "Bearer eyJhbG..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Login karo pehle!" });
    }

    const token = authHeader.split(" ")[1];  // "Bearer " hata ke token lo

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User DB se lo aur request mein attach karo
    req.user = await User.findById(decoded.userId);

    next();  // aage jao

  } catch (error) {
    res.status(401).json({ error: "Invalid token!" });
  }
}

module.exports = protect;