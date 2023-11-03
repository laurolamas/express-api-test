const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  condition: String,
  category: String,
  sold: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  review: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there is a User model for the user_id reference
  },
  images: [String], // Array of image URLs
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
