const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const { checkAuth } = require("../utils/authValidator");
const upload = multer();



// Get all users - REMOVE THIS BEFORE DEPLOYMENT
router.get("/", userController.getAllUsers);

// Get the profile of currently authenticated user.
router.get("/profile", checkAuth, userController.getProfile);

// Get a user by id
router.get("/:id", userController.getUserById);

// Create a new user
router.post("/", (req, res) => {
    res.json({ message: "usa la ruta auth/register bobo" })
});

// Update a user
router.put("/", checkAuth, userController.updateUserById);

// Delete a user by ID
router.delete("/", checkAuth, userController.deleteUserById);



module.exports = router;
