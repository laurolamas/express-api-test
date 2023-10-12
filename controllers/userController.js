const User = require("../models/user");
const { uploadImage } = require("../services/imageService");

// Controller for handling user-related logic

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const imageFile = req.file;

  if (!name || !email || !imageFile) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const imageUrl = await uploadImage(imageFile);

  const user = new User({
    name,
    email,
    imageUrl,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).exec();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  const { name, email } = req.body;
  const imageFile = req.file;

  try {
    const updatedFields = {
      name,
      email,
    };

    if (imageFile) {
      updatedFields.imageUrl = await uploadImage(imageFile);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get the profile of currently authenticated user.
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
