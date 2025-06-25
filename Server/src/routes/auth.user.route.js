const express = require('express');
const { registerUser, loginUser, logoutUser, deleteUser, updateUser, getAllUsers, forgotPassword, resetPassword } = require('../controller/user.Controller');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
