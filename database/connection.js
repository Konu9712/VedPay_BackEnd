const mongoose = require("mongoose");
const Key = require("dotenv").config();

// const DB = process.env.DB_KEY;
const DB = "mongodb+srv://vedpay:vedpay123@cluster0.ehzuh.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(
    DB,
    {
      useNewUrlParser: true, useUnifiedTopology: true
    },
    (err) => {
      if (err) {
      console.log("error in connection", err);
      } else {
      console.log("mongodb is connected");
      }});
} catch (e) { 
  console.log("Could not connect");
}