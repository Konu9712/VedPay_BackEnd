const mongoose = require("mongoose");

const globalTransactionSechma = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  transactionHistory: [
    {
      to: {
        type: String,
        required: true,
        trim: true,
      },
      from: {
        type: String,
        required: true,
        trim: true,
      },
      source: {
        type: String,
        requires: true,
        trim: true,
      },
      transactionID: {
        type: String,
        required: true,
        trim: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});

const GlobalTransactionSechma = mongoose.model(
  "GlobalTransactionSechma",
  globalTransactionSechma
);
module.exports = GlobalTransactionSechma;
