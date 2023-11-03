// Import necessary modules and models
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const { uploadImage } = require('../services/imageService');
const { createCookie } = require('../utils/cookies');

// User Authentication
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Check if password is correct
    console.log("db password:", user.password)
    console.log("input password:", password)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    createCookie(res, user);

    res.status(200).json({ message: 'Logged in' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User Logout
exports.logout = async (req, res) => {
  try {
    // Clear cookie with JWT token
    res.clearCookie("token");
    // Send response with message 'logged out'
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User Registration
exports.register = async (req, res) => {
  const { username, password, name, email, phoneNumber, city } = req.body;
  const imageFile = req.file;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    // Check if user already exists by username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Upload image to Azure blob storage
    const imageUrl = await uploadImage(imageFile);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
      name,
      email,
      phoneNumber,
      city,
      imageUrl,
      favProducts: [],
    });

    // Save the user to the database
    try {
      const savedUser = await user.save({ "select": "-password" });

      createCookie(res, savedUser);

      // Send response with message 'ok'
      res.status(201).json({ message: "ok" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Password Reset Request
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and save reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email with reset link
    // ...

    res.status(200).json({ message: "Reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Password Reset Confirmation
exports.confirmPasswordReset = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Check if user exists and token is valid
    const user = await User.findOne({ resetToken });
    if (!user || user.resetTokenExpiration < Date.now()) {
      return res.status(404).json({ message: "Invalid reset token" });
    }

    // Update password and clear reset token
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
