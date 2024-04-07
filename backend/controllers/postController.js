import asyncHandler from "../middleware/asyncHandler.js";

import Post from "../models/postModel.js";

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // Populate user's name and email

  // Check if post exists
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error("Post not found!");
  }
});

export { getPosts, getPostById };
