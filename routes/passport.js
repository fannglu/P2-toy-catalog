const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Registration = require("../models/Registration")

// passport.serializeUser(
//   Registration.serializeUser(function (user, done) {
//     done(null, user.id);
//   })
// );




passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
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
  })
);

module.exports = passport;
