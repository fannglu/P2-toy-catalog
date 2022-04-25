const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema(
  {
    fistname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactPhone: {
      type: String,
    },
    password1: {
      type: String,
      trim: true,
    },
    password2: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
  },
  { strict: false }
);



module.exports = mongoose.model("Registration", registrationSchema);
