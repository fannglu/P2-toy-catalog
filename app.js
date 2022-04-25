const express = require("express");
const path = require("path");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
const expressSession = require("express-session");
const Registration = mongoose.model("Registration");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
// const bcrypt = require("bcrypt");

app.use(mongoSanitize());

app.use(express.json({ limit: "10kb" }));
app.use(require("morgan")("combined"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
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
  })
);
app.use("/", router);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(Registration.serializeUser());

passport.deserializeUser(Registration.deserializeUser());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      Registration.findOne({ email: email })
        .then((user) => {
          if (!user) {
            const newUser = new User({ email, password });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then()((user) => {
                    return done(null, user);
                  })
                  .catch((err) => {
                    return done(null, false, { message: err });
                  });
              });
            });
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Wrong Password" });
              }
            });
          }
        })
        .catch((err) => {
          return done(null, false, { message: err });
        });
    }
  )
);

module.exports = app;
