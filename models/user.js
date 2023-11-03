const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  phoneNumber: String,
  city: String,
  imageUrl: String,
  favProducts: [String],
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
