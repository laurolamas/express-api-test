const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http").Server(app);
const port = 8080;
const db = require("./utils/db"); // Import the database connection setup
const cors = require("cors");

// allow cors from any origin
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

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
