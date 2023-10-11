const Product = require("../models/product");
const { uploadImage } = require("../services/imageService");

// Controller for handling product-related logic

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, condition, category, user_id } = req.body;
  //const images = req.files.map((file) => file.path);
  let images = req.files;

  console.log(images);

  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const url = await uploadImage(image);
      return url;
    })
  );

  images = imageUrls;

  console.log(images);

  const productData = {
    name,
    description,
    price,
    condition,
    category,
    user_id,
    images,
  };

  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a product by ID
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

// Update a product by ID
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

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
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

// Search for products based on specific criteria (e.g., name, price).
exports.searchProducts = async (req, res) => {
  try {
    const filters = req.query;
    const products = await Product.find(filters).exec();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
