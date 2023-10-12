const { body } = require("express-validator");
const mongoose = require("mongoose");

exports.createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 200 })
    .withMessage("Description must be less than 200 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("condition")
    .notEmpty()
    .withMessage("Condition is required")
    .isLength({ max: 50 })
    .withMessage("Condition must be less than 50 characters"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ max: 50 })
    .withMessage("Category must be less than 50 characters"),
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid User ID"),
];
