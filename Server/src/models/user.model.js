const mongoose = require('mongoose');
const bcryptjs = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next){
  const user = this;
  if (!user.isModified('password')) return next();
  const hashedPassword = await bcryptjs.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = function (givenPassword) {
  return bcryptjs.compare(givenPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
