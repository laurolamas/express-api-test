// Import the express module
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the productController module
const productController = require("../controllers/productController");

// Import the multer module
const multer = require("multer");

// Create a new multer instance
const upload = multer();

const { createProductValidator } = require("../validators/productValidator");

/**
 * @description Create a new product
 * @method POST
 * @route /api/products/
 * @param {Array} images - An array of images to upload
 * @returns {Object} The newly created product
 */
router.post(
  "/",
  upload.array("images", 4),
  createProductValidator,
  productController.createProduct
);

/**
 * @description Get all products
 * @method GET
 * @route /api/products/
 * @returns {Array} An array of all products
 */
router.get("/", productController.getAllProducts);

/**
 * @description Search for products based on specific criteria (e.g., name, category, price).
 * @method GET
 * @route /api/products/search
 * @returns {Array} An array of products that match the search criteria
 */
router.get("/search", productController.searchProducts);

/**
 * @description Get a product by ID
 * @method GET
 * @route /api/products/:id
 * @param {string} id - The ID of the product to retrieve
 * @returns {Object} The product with the specified ID
 */
router.get("/:id", productController.getProductById);

/**
 * @description Update a product by ID
 * @method PUT
 * @route /api/products/:id
 * @param {string} id - The ID of the product to update
 * @returns {Object} The updated product
 */
router.put("/:id", productController.updateProductById);

/**
 * @description Delete a product by ID
 * @method DELETE
 * @route /api/products/:id
 * @param {string} id - The ID of the product to delete
 * @returns {Object} A message indicating that the product was deleted
 */
router.delete("/:id", productController.deleteProductById);

// Export the router object
module.exports = router;
