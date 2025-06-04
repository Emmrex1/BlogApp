
const Blog = require("../models/blogs.model");
const Comment = require("../models/comment.model");

// Create a new blog post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Blog({ ...req.body, author: req.userId });
    await newPost.save();
    res.status(201).send({
      message: "Post created successfully",
      post: newPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send({ message: "Error creating post" });
  }
};

// Get all blog posts (with filters)
exports.getPosts = async (req, res) => {
  try {
    const { search, category, location } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = location;
    }

    const posts = await Blog.find(query)
      .populate('author', 'email')
      .sort({ createdAt: -1 });

    res.status(200).send(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send({ message: "Error fetching posts" });
  }
};

// Get a single blog post with comments
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) return res.status(404).send({ message: "Post not found" });

    const comments = await Comment.find({ postId }).populate('user', 'username email');
    res.status(200).send({ post, comments });
  } catch (error) {
    console.error('Error fetching single post:', error);
    res.status(500).send({ message: "Error fetching single post" });
  }
};

// Update a blog post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Blog.findByIdAndUpdate(postId, req.body, { new: true });
    if (!updatedPost) return res.status(404).send({ message: "Post not found" });

    res.status(200).send({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send({ message: "Error updating post" });
  }
};

// Delete a blog post and its comments
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Blog.findByIdAndDelete(postId);
    if (!deletedPost) return res.status(404).send({ message: "Post not found" });

    await Comment.deleteMany({ postId });
    res.status(200).send({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send({ message: "Error deleting post" });
  }
};

// Get related posts
exports.getRelatedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: "Post ID is required" });

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send({ message: "Post not found" });

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
};
