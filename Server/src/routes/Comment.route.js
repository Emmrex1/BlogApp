const express = require('express');
const { createComment, getTotalComments } = require('../controller/comments.Controller');
const router = express.Router();


router.post('/post-comment', createComment);
router.get('/total-comments', getTotalComments);

module.exports = router;
