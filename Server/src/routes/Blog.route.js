const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const { createPost, getPosts, getPostById, updatePost, deletePost, getRelatedPosts } = require('../controller/blogs.Controller');

router.post('/create-post', verifyToken, isAdmin, createPost);
router.get('/',getPosts);
router.get('/:id', getPostById);
router.patch('/update-post/:id', verifyToken, updatePost);
router.delete('/delete/:id', verifyToken, deletePost);
router.get('/related/:id', getRelatedPosts);


module.exports = router;
