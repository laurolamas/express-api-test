const jwt = require("jsonwebtoken");

exports.createCookie = (res, payload) => {
    // Create and send JWT token
    const token = jwt.sign({ user: payload }, process.env.JWT_SECRET);
    // Set cookie with JWT token
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 360000000, // 100 hours
        secure: true,
    });
}