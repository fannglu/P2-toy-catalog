const connectEnsureLogin = require("connect-ensure-login");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");

const bcrypt = require("bcrypt");
const Registration = require("../models/Registration");

const { check, validationResult } = require("express-validator");

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

router.get("/login", function (req, res) {
  res.render("signin");
});
router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("signin");
});
router.get(
  "/catalog",
  connectEnsureLogin.ensureLoggedIn(),
  function (req, res) {
    res.render("catalog");
  }
);

router.get("/home", function (req, res) {
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
    check("username")
      .isLength({ min: 1 })
      .withMessage("Please enter a username"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Please enter a password"),
  ],
  (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      Registration.register(
        new Registration({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          contactPhone: req.body.contactPhone,
          password: req.body.password,
          username: req.body.username,
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

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/home",
//   failureRedirect: "/login",

// }),

// )

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       // return res.status(400).json({ errors: err });
//       return next(err); 
      
//     }
//     if (!user) {
//       return res.redirect("/login?info=" + info);
//       // return res.status(400).json({ errors: "No user found" });
//     }

//     req.logIn(user, function (err) {
//       if (err) {
//         // return res.status(400).json({ errors: err });
//         return next(err); 
//       }
//       return res.redirect("/home");
//     });
//   })(req, res, next);
// });

module.exports = router;
