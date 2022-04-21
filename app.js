const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();

//define express app
const app = express();
const port = process.env.port || 5000;

// files || directory
app.use(express.static("public"));
app.use(bodyParser.json());

// View engine Setup
// app.set("views", path.join(__dirname, "/views"));
// app.set("view engine", "html");

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
