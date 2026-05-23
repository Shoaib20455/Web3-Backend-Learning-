const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true, // "User@Email.com" ko "user@email.com" kar dega
    trim: true       // Faltu spaces khatam kar dega
  },
  password: { 
    type: String, 
    required: [true, "Password is required"] 
  },
  // Advanced Approach: Wallet model ke sath link (Reference) karna
  wallet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Wallet" // Yeh aapke Wallet model ka naam hai
  }
}, {
  timestamps: true // Manual createdAt likhne ki zaroorat nahi, yeh khud handle karega
});

// Password save hone se pehle hash karo (Bilkul Perfect hai aapka yeh part)
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password compare karne ka method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);