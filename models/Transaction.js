// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  value: {
    type: String,   // ETH amount (wei mein)
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    default: "pending",
  },
  blockNumber: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);