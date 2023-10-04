const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const port = 3000;
const db = require("./db"); // Import the database connection setup

// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require("./routes/userRoutes"); // Import the user routes
const productRoutes = require("./routes/productRoutes"); // Import the product routes
app.use("/users", userRoutes); // Use the user routes at /users
app.use("/products", productRoutes); //Use the product routes at /products

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the best API in Gregorio Suarez street");
});

// Listen for connections
http.listen(port, () => {
  console.log("listening on *:" + port);
});