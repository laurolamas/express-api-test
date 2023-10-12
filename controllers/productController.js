const Product = require("../models/product");
const { uploadImage } = require("../services/imageService");
const { validationResult } = require("express-validator");

/**
 * Controller for handling product-related logic
 * @module productController
 */

/**
 * Create a new product
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON representation of the created product
 */
exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, condition, category, user_id } = req.body;
  let images = req.files;

  /**
   * Uploads images and returns their URLs
   * @function
   * @async
   * @param {Array} images - Array of images to upload
   * @returns {Promise<Array>} - Array of URLs for the uploaded images
   */
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const url = await uploadImage(image);
      return url;
    })
  );

  const productData = {
    name,
    description,
    price,
    condition,
    category,
    user_id,
    images: imageUrls,
  };

  try {
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get all products
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON representation of all products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get a product by ID
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON representation of the requested product
 */
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update a product by ID
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON representation of the updated product
 */
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;
    const product = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    ).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a product by ID
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Empty response with status code 204
 */
exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId, "hola");
    const product = await Product.findByIdAndDelete(productId).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).json(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Search for products based on specific criteria (e.g., name, category, price).
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON representation of matching products
 */
exports.searchProducts = async (req, res) => {
  try {
    const { name, category, price } = req.query;
    const query = {};
    if (name) {
      query.name = name;
    }
    if (category) {
      query.category = category;
    }
    if (price) {
      query.price = price;
    }
    const products = await Product.find(query).exec();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
