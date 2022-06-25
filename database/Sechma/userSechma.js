const mongoose = require("mongoose");

const userSechma = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  biometric: {
    type: String,
    // required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSechma);
module.exports = User;
