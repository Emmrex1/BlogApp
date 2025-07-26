const User = require('../models/user.model');
const generateToken = require('../middleware/generateToken');
const { sendResetEmail } = require('../../utils/sendEmail');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET_KEY;
// Register
exports.registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // ✅ Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered" });
    }

    // ✅ Proceed to create new user
    const user = new User({ email, password, username });
    await user.save();

    const { _id, role } = user;
    res.status(200).send({
      message: "User registered successfully",
      user: { _id, email, username, role }
    });
  } catch (error) {
    console.error('Failed to register:', error);
    res.status(500).send({ message: "Registration failed" });
  }
};


// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).send({ message: "Password does not match" });
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.status(200).send({
      message: "User login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Failed to login:', error);
    res.status(500).send({ message: "Login failed. Try again." });
  }
};

// Logout
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logged out successful' });
  } catch (error) {
    console.error('Failed to logout:', error);
    res.status(500).json({ message: "Logout failed. Try again." });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'id email role');
    res.status(200).send({ message: 'Users found successfully', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

// Update a user's role
exports.updateUser = async (req, res) => { 
  try {
    const { id } = req.params;
    const { role, status } = req.body; 

    const updateData = {};
    if (role) updateData.role = role;
    if (status) updateData.status = status;

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: "Failed to update user." });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendResetEmail(email, resetLink);

    res.status(200).send({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).send({ message: "Failed to send reset link" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    user.password = password;
    await user.save();        

    res.status(200).send({ message: "Password has been reset" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).send({ message: "Invalid or expired token" });
  }
};


