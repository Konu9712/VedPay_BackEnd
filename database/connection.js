const mongoose = require("mongoose");
const Key = require("dotenv").config();
const DB = process.env.DB_KEY;
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connection successful");
  }
);
