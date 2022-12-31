const mongoose = require("mongoose");
const Key = require("dotenv").config();
const DB = "mongodb://vedpay:vedpay9712@cluster0-shard-00-00.ehzuh.mongodb.net:27017,cluster0-shard-00-01.ehzuh.mongodb.net:27017,cluster0-shard-00-02.ehzuh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-iagg5f-shard-0&authSource=admin&retryWrites=true&w=majority";
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
