const mongoose = require("mongoose");

const cardSechma = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  allCards: [
    {
      cardId: {
        type: String,
        required: true,
      },
      cardNumber: {
        type: Number,
        required: true,
      },
      expiry: {
        type: String,
        required: true,
      },
      cvv: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      cardTransctions: [
        {
          to: {
            type: String,
            required: true,
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
    },
  ],
});

const Card = mongoose.model("Card", cardSechma);
module.exports = Card;
