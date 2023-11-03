const jwt = require("jsonwebtoken");

exports.checkAuth = async (req, res, next) => {
    // Get the token from cookie
    const token = req.cookies.token;
    // If token doesn't exist, return error
    if (!token) {
        console.log("im here")
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the user to the request object
        req.user = decoded.user;
        // Remove password from the user object
        delete req.user.password;
        // Call next middleware
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
}