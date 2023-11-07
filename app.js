const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http").Server(app);
const port = 8080;
const db = require("./utils/db"); // Import the database connection setup
const cors = require("cors");

// Define a custom CORS middleware
const customCors = (req, callback) => {
  const origin = req.header('Origin');

  // Check if the origin is valid; if not, do not set the 'Access-Control-Allow-Origin' header
  if (origin) {
    callback(null, { origin, credentials: true });
  } else {
    callback(new Error('Invalid origin'), false);
  }
};

// Use the custom CORS middleware
app.use(cors(customCors));

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
