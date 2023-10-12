const { body } = require("express-validator");
const mongoose = require("mongoose");

exports.createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 50 })
    .withMessage("Email must be less than 50 characters"),
];
