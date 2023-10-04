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
app.use("/users", userRoutes); // Use the user routes at /users

const productRoutes = require("./routes/productRoutes"); // Import the product routes
app.use("/products", productRoutes); //Use the product routes at /products

const authRoutes = require("./routes/authRoutes"); // Import the auth routes
app.use("/auth", authRoutes); // Use the auth routes at /auth

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the best API in Gregorio Suarez street");
});

// Listen for connections
http.listen(port, () => {
  console.log("Listening on port: " + port);
});
