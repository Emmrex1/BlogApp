const express = require('express');
const User = require('../models/user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
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
    res.cookie("token",token,{
      httpOnly:true,
      secure:true,
      sameSite:true

    })


    res.status(200).send({
      message: "User login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Failed to login:', error);
    res.status(500).send({ message: "Login failed. Try again." });
  }
});

router.post('/logout', async (req , res) => {
  try {
     res.clearCookie('token')
     res.status(200).send({message: 'Logged out successful'})
  } catch (error) {
    console.error('Failed to logout:', error);
    res.status(500).json({ message: "Logout failed. Try again." });
  }
})

router.get('/users', async (req ,res) => {
 try {
    const users = await User.find({},'id email role')
    res.status(200).send({message: 'user found successfully', users});
 } catch (error) {
  console.error('Error fetching users:', error);
    res.status(500).json({ message: "failed to fetch users." });
  }

})

router.delete('/users/:id', async (req , res) => {
  try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id)
    if(!user){
      return res.status(404).send({message: "User not found"})
    }
    res.status(200).send({message:"User deleted Successfully"})



  } catch (error) { 
    console.error('Error deleting users:', error);
    res.status(500).json({ message: "failed to deleted users." });
  }
})

router.put('/users/:id', async (req , res) =>{
  try {
     const {id} = req.params;
     const {role} = req.body;
     const user = await User.findByIdAndUpdate(id, {role},{new:true});

     if(!user){
       res.status(404).send({message:"User not found"})
     }

     res.status(200).send({message: "User Updated successfully",user})

  } catch (error) {
    console.error('Error updating users:', error);
    res.status(500).json({ message: "failed to update users." });
  }
})

module.exports = router;
