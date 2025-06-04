const Comment = require('../models/comment.model');

// POST: Create new comment
exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(200).send({
      message: "Comment Created Successfully",
      comment: newComment
    });
  } catch (error) {
    console.error('An error occurred while posting new comment:', error);
    res.status(500).send({ message: "An error occurred while posting new comment" });
  }
};

// GET: Total comment count
exports.getTotalComments = async (req, res) => {
  try {
    const totalComment = await Comment.countDocuments({});
    res.status(200).send({
      message: "Total comment count",
      totalComment
    });
  } catch (error) {
    console.error('An error occurred while getting comment count:', error);
    res.status(500).send({ message: "An error occurred while getting comment count" });
  }
};
