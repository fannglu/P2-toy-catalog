// require("dotenv").config();
const mongoose = require("mongoose");
// const express = require("express");
// const path = require("path");
// var app = express();
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/ToyCatalog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// require("./models/Registration");
const app = require("./app");

app.listen(5000, function () {
  console.log(`Express is running on port 5000`);
});
