const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const registrationSchema = new mongoose.Schema(
  {
    fistname: {
      type: String,
      // required: true,
    },
    lastname: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    contactPhone: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
  },
  { strict: false }
);

registrationSchema.plugin(passportLocalMongoose);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
