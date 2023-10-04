const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// User Authentication
router.post("/login", authController.login);

// User Logout
router.post("/logout", authController.logout);

// User Registration
router.post("/register", authController.register);

// Password Reset Request
router.post("/reset-password/request", authController.requestPasswordReset);

// Password Reset Confirmation
router.post("/reset-password/confirm", authController.confirmPasswordReset);

module.exports = router;
