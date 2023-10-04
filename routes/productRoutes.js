const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Create a new product
router.post("/", productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a product by ID
router.get("/:id", productController.getProductById);

// Update a product by ID
router.put("/:id", productController.updateProductById);

// Delete a product by ID
router.delete("/:id", productController.deleteProductById);

/*
Route: GET /products/search
Description: Search for products based on specific criteria (e.g., name, category, price).
Query Parameters: Filters for searching products (e.g., name, category, price).
Response Codes:
200 OK: If the operation is successful.
Content: JSON representation of matching products.
*/
router.get("/search", productController.searchProducts);

module.exports = router;
