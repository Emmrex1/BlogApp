const express = require('express');
const Comment = require('../models/comment.model');
const router = express.Router();


router.post('/post-comment', async(req , res) =>{
    console.log(req.body)

  try {
     const newComment = new Comment(req.body)
     await newComment.save() 
  res.status(200).send({message: "Comment Created Successfully", comment: newComment})
  
  
  
    } catch (error) {
    
   console.error('An error occur while posting new comment:', error);
    res.status(500).send({ message: "An error occur while posting new comment" });
  }
}) 

router.get('/total-comments', async (req ,res) =>{

    try {
        const totalComment = await Comment.countDocuments({})
        res.status(200).send({message:"Total comment count", totalComment})



    } catch (error) {
    console.error('An error occur while getting comment count:', error);
    res.status(500).send({ message: "An error occur while posting new comment" });
  }
})

module.exports = router