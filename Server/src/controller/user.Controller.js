const User = require('../models/user.model');
const generateToken = require('../middleware/generateToken');

// Register
exports.registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
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
    const { role, status } = req.body;  // accept status too

    // Build update object dynamically
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
