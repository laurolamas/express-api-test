const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");

const upload = multer();

// Define routes for user-related actions

// Get all users
router.get("/", userController.getAllUsers);

// Create a new user
router.post("/", upload.single("profileImage"), userController.createUser);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Delete a user by ID
router.delete("/:id", userController.deleteUserById);

// Update a user by ID (You can implement this)
router.put("/:id", userController.updateUserById);

// Get the profile of currently authenticated user.
router.get("/profile", userController.getProfile);

module.exports = router;
