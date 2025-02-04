const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const { content, postId } = req.body;
  try {
    const comment = new Comment({ content, author: req.userId, post: postId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addComment };