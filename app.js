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
app.use("/", router);

// View engine Setup
// app.set("views", path.join(__dirname, "/views"));
// app.set("view engine", "html");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/register.html"));
});

app.get("/likedProducts", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/liked.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/signin.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/catalog", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/product.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/contact.html"));
});

app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
