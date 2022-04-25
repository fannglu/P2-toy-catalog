const path = require("path");
const auth = require("http-auth");
const connectEnsureLogin = require("connect-ensure-login");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");

const bcrypt = require("bcrypt");
const Registration = require("../models/Registration");

const { check, validationResult } = require("express-validator");

router.get("/login", connectEnsureLogin.ensureLoggedIn(), function (req, res) {
  res.render("signin");
});
router.get("/", (req, res) => {
  res.render("signin");
});
router.get(
  "/catalog",
  connectEnsureLogin.ensureLoggedIn(),
  function (req, res) {
    res.render("catalog");
  }
);

router.get("/home", connectEnsureLogin.ensureLoggedIn(), function (req, res) {
  res.render("index");
});
router.get("/register", function (req, res) {
  res.render("register");
});
router.get(
  "/contact",
  connectEnsureLogin.ensureLoggedIn(),
  function (req, res) {
    res.render("contact");
  }
);

// router.get(
//   "/registrants",
//   basic.check((req, res) => {
//     Registration.find()
//       .then((registrations) => {
//         res.render("registrants", {
//           title: "Listing registrations",
//           registrations,
//         });
//       })
//       .catch(() => {
//         res.send("Sorry! Something went wrong.");
//       });
//   })
// );

router.post(
  "/register",
  [
    check("firstname")
      .isLength({ min: 1 })
      .withMessage("Please enter your first name"),
    check("lastname")
      .isLength({ min: 1 })
      .withMessage("Please enter your first"),
    check("email")
      .isEmail()
      .isLength({ min: 1 })
      .withMessage("Please enter a valid email"),
    check("contactPhone")
      .isMobilePhone()
      .isLength({ min: 1 })
      .withMessage("Please enter a valid phone number"),
    check("password1")
      .isLength({ min: 1 })
      .withMessage("Please enter a password"),
    check("password2")
      .isLength({ min: 1 })
      .withMessage("Password does not match"),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      Registration.register(
        new Registration({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          contactPhone: req.body.contactPhone,
          password: req.body.password1,
          password2: req.body.password2,
        }),
        req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            res.render("register");
          }
          passport.authenticate("local")(req, res, function () {
            res.redirect("/login");
          });
        }
      );
    } else {
      res.render("register", {
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      // return res.redirect("/login?info=" + info);
      return res.status(400).json({ errors: "No user found" });
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.redirect("/home");
    });
  })(req, res, next);
});

module.exports = router;
