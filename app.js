const express = require("express");
const path = require("path");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
const expressSession = require("express-session")({
  secret: "westcliffBootcamp",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60000,
  },
});
app.use(mongoSanitize());

app.use(express.json({ limit: "10kb" }));
app.use(require("morgan")("combined"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.use(express.static("public"));
app.use(
  expressSession({
    secret: "westcliff",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1 * 60 * 1000,
    },
    catalog: new MongoStore({ mongooseConnection1: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
