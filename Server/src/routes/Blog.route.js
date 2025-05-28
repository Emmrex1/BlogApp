const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blogs.model'); 
const Comment = require('../models/comment.model');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.post('/create-post',verifyToken,isAdmin, async (req, res) => {
  try {
    const newPost = new Blog({ ...req.body, author:req.userId});
    await newPost.save();
    res.status(201).send({
      message: "post created successfully",
      post: newPost
    });
  } catch (error) {
    console.error('error creating post:', error);
    res.status(500).send({ message: "error creating post" });
  }
});

router.get('/', async (req, res) => {
  try {
    const {search,category, location} = req.query
    console.log(search)
       let query ={}
  
       if (search)
        query = {
             ...query,
             $or: [
                {title: {$regex: search, $options: "i"}},
                {content: {$regex: search, $options: "i"}}
             ]
    }

 if (category){
        query = {
             ...query,
             category:category
             
    }
 }

 if (location){
        query = {
             ...query,
             location:location
             
    }
 }
  
    const posts = await Blog.find(query).populate('author','email').sort({createdAt:-1})
    res.status(201).send(posts);
  } catch (error) {
    console.error('error fetching post:', error);
    res.status(500).send({ message: "error fetching post" });
  }
});

;

router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const comments = await Comment.find({ postId }).populate('user', 'username email');

    res.status(200).send({ post, comments }); 
  } catch (error) {
    console.error('Error fetching single post:', error);
    res.status(500).send({ message: "Error fetching single post" });
  }
});




router.patch('/update-post/:id',verifyToken,async(req, res) =>{
    try {
         const postId = req.params.id
     const UpdatedPost = await Blog.findByIdAndUpdate(postId,{
        ...req.body
     },{new:true})

     if(!UpdatedPost) {
        res.status(404).send({message:"Post not found"})
     }
     res.status(200).send({message: "Post Updated Successfully", post:UpdatedPost})

    } catch (error) {
       console.error('error fetching updating post:', error);
    res.status(500).send({ message: "error updating post" });
  }
})

router.delete('/delete/:id',verifyToken, async (req, res) =>{
    try {
      const postId = req.params.id
      const DeletedPost = await Blog.findOneAndDelete(postId)

      
      if(!DeletedPost) {
        return res.status(404).send({message: "Post not found"})
      }
       
      await Comment.deleteMany({postId:postId})

      res.status(200).send({
        message: "Post deleted successfully", post:DeletedPost
      })

    } catch (error) {
           console.error('error fetching delete post:', error);
    res.status(500).send({ message: "error delete post" });
  }
})

router.get('/related/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Post ID is required" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send({ message: "Post not found" });
    }

    const words = blog.title.split(" ").filter(word => word.length > 2);
    const titleRegex = new RegExp(words.join('|'), 'i');

    const relatedPosts = await Blog.find({
      _id: { $ne: id },
      category: blog.category,
      $or: [
        { title: { $regex: titleRegex } },
        { description: { $regex: titleRegex } }
      ]
    }).limit(5);

    res.status(200).send(relatedPosts);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    res.status(500).send({ message: "Error fetching related posts" });
  }
});

module.exports = router;
