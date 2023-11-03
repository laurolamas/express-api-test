const { body } = require("express-validator");
const mongoose = require("mongoose");

exports.createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 50 })
    .withMessage("Username must be less than 50 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 50 })
    .withMessage("Password must be less than 50 characters"),
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
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ max: 50 })
    .withMessage("Phone number must be less than 50 characters"),
  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isLength({ max: 50 })
    .withMessage("City must be less than 50 characters"),
];
