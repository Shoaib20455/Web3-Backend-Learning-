const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Wallet address is required"], // Aap custom error message bhi de sakte hain
    unique: true,
    lowercase: true,
    trim: true, // Faltu spaces khud hi khatam kar dega
  },
  network: {
    type: String,
    enum: ["ethereum", "solana", "polygon"],
    lowercase: true,
    default: "ethereum",
  },
  balance: {
    type: String,
    default: "0",
  }
}, {
  timestamps: true // Yeh khud hi `createdAt` aur `updatedAt` fields bana dega aur handle karega
});

module.exports = mongoose.model("Wallet", walletSchema);