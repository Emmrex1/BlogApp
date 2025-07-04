const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },


  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },

  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
