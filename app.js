const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(express.json());

// 2. Routes
const walletRoutes = require("./routes/wallet");
app.use("/wallets", walletRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Web3 Backend chal raha hai!" });
});

// 3. Pehle DB connect karo, PHIR server start karo
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected!");

    // Server yahan start hoga — DB connect hone KE BAAD
    app.listen(process.env.PORT, () => {
      console.log(`Server port ${process.env.PORT} pe chal raha hai`);
    });

  } catch (error) {
    console.log("❌ Connection failed:", error.message);
  }
}

connectDB();