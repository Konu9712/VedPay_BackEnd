const mongoose = require("mongoose");
const Key = require("dotenv").config();

const DB = process.env.DB_KEY;
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