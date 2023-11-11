const User = require("../models/user");
const { uploadImage } = require("../services/imageService");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { createCookie } = require("../utils/cookies");
const { deleteImage } = require("../services/imageService");

// Controller for handling user-related logic

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { username, password, name, email, phoneNumber, city } = req.body;
  const imageFile = req.file;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Upload image to Azure blob storage
  const imageUrl = await uploadImage(imageFile);

  // Create a new user
  const user = new User({
    username,
    password,
    name,
    email,
    phoneNumber,
    city,
    imageUrl,
    favProducts: [],
  });

  // Save the user to the database
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    // Find user by id and select only id, name, city and imageUrl
    const user = await User.findOne(
      { _id: req.params.id },
      { username: 1, name: 1, city: 1, imageUrl: 1, _id: 0 }
    ).exec();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
// Habria que implementar que se borren los productos que tiene el usuario
// Habria que implementar que se borre la imagen del usuario en el blob
exports.deleteUserById = async (req, res) => {
  try {
    deleteImage(req.user.imageUrl);

    const user = await User.findByIdAndDelete(req.user._id).exec();

    // Clear cookie with JWT token
    res.clearCookie("token");
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user by ID
// Habria que implementar que se borren las imagenes del usuario en el blob al cambiarla
exports.updateUserById = async (req, res) => {
  const { username, name, email, phoneNumber, city, favProducts } = req.body;
  const imageFile = req.file;
  const userId = req.user._id;

  try {
    const updatedFields = {
      username: username,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      city: city,
      favProducts: favProducts,
    };
    // Hay que eliminar la imagen que ya había en el blob
    if (imageFile) {
      updatedFields.imageUrl = await uploadImage(imageFile);
    }

    // Update user but remove password from returned user
    const user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      // Remove password from the user object
      select: "-password",
    }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    createCookie(res, user);

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get the profile of currently authenticated user.
exports.getProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(req.user._id).exec();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get the public profile of a user by username

exports.getPublicProfile = async (req, res) => {
  const username = req.params.username;
  console.log("Fetching public profile of:", username);
  try {
    const user = await User.findOne(
      { username: username },
      { username: 1, name: 1, city: 1, imageUrl: 1, _id: 1 }
    ).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
