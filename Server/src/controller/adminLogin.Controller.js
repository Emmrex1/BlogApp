
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "yoursecret";

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials,please try again or signup" });
    }

    // 2. Check if user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // 5. Return user info (excluding password)
    const { password: _, ...userData } = user._doc;

    res.json({message:"Successfull login", user: userData, token });
  } catch (error) {
    console.error("Admin login failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};


