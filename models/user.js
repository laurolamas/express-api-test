const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
  // Add other fields as needed
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
