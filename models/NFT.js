// models/NFT.js
const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    required: true,
  },
  owner: {
    type: String,    // wallet address
    required: true,
  },
  metadata: {
    name: String,
    description: String,
    image: String,
    attributes: [    // array of traits
      {
        trait_type: String,
        value: String,
      }
    ]
  },
});

module.exports = mongoose.model("NFT", nftSchema);