const express = require('express');
const { registerUser, loginUser, logoutUser, deleteUser, updateUser, getAllUsers } = require('../controller/user.Controller');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

module.exports = router;
