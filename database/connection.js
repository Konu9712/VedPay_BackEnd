const mongoose = require("mongoose");
const Key = require("dotenv").config();
const DB = Key.parsed.DB_KEY;
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
