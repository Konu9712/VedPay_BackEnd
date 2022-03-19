const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
//Database Connection
require("./database/connection");

//Listener
app.listen(port, () => {
  console.log("Server is running");
});
