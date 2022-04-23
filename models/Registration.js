const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  contactPhone: {
    type: Number,
    trim: true,
    required: true,
  },
  businessType: {
    type: String,
    trim: true,
    required: true,
  },
  businessWebsite: {
    type: String,
    trim: true,
    required: true,
  },
  legalBusinessName: {
    type: String,
    trim: true,
    required: true,
  },
  dbaName: { 
    type: String,
    trim: true,
    required: true,
  },
  address1: {
    type: String,
    trim: true,
    required: true,
  },
  address2: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
  zip: {
    type: Number,
    trim: true,
    required: true,
  },
  billingEmail: {
    type: String,
    trim: true,
    required: true,
  },
  billingPhone: {
    type: Number,
    trim: true,
    required: true,
  },
  taxID: {
    type: Number,
    trim: true,
    required: true,
  },
  password1: {
    type: String,
    trim: true,
    required: true,
  },
  password2: {
    type: String,
    trim: true,
    required: true,
  },
});

// module.exports = mongoose.model("Registration", registrationSchema);


// [
//     check("firstname")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a firstname"),
//     check("lastname")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a lastname"),
//     check("email").isLength({ min: 1 }).withMessage("email"),
//     check("contactPhone")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a contactPhone"),
//     check("businessType")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a businessType"),
//     check("businessWebsite")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a businessWebsite"),
//     check("legalBusinessName")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a legalBusinessName"),
//     check("dbaName").isLength({ min: 0 }),
//     check("address1")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a address"),
//     check("address2").isLength({ min: 0 }),
//     check("city").isLength({ min: 1 }).withMessage("Please enter a city"),
//     check("state").isLength({ min: 1 }).withMessage("Please enter a state"),
//     check("zip").isLength({ min: 5 }).withMessage("Please enter a zip"),
//     check("billingEmail")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a billingEmail"),
//     check("billingPhone")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a billingPhone"),
//     check("taxID").isLength({ min: 1 }).withMessage("Please enter a taxID"),
//     check("password1")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a password"),
//     check("password2")
//       .isLength({ min: 1 })
//       .withMessage("Please enter a repeat password"),
//   ],