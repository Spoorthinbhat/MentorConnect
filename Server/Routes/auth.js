const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/StudentLogin");

const router = express.Router();
const JWT_SECRET = "xZC%j{u@#+|K-oq5"; // Replace with a strong secret key for production

// Signup Route
// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, age, dob, email, password, role } = req.body;

    // Check if role is provided
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      phone,
      age,
      dob,
      email,
      password: hashedPassword,
      role, // Ensure role is passed correctly
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, email });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const getUserNameByEmail = async (email) => {
  try {
    if (!email) {
      throw new Error("Email parameter is required");
    }

    const response = await axios.get("http://localhost:5000/auth/name", {
      params: { email },
    });

    if (response.status === 200) {
      console.log("User name retrieved successfully:", response.data.name);
      return response.data.name;
    } else {
      console.error("Failed to retrieve user name:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user name by email:", error.message);
    return null;
  }
};

module.exports = router;
