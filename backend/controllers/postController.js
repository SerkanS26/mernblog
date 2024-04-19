import asyncHandler from "../middleware/asyncHandler.js";

import Post from "../models/postModel.js";

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT_POSTS;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Post.countDocuments({ ...keyword });

  const posts = await Post.find({ ...keyword })
    .populate("user", "name email")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ posts, page, pages: Math.ceil(count / pageSize) });
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

// @desc   Get logged in user posts
// @route  GET /api/posts/myposts
// @access Private
const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id });
  if (!posts) {
    res.status(404);
    throw new Error("No posts found!");
  }
  res.status(200).json(posts);
});

// @desc   Create a post
// @route  POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    user: req.user._id,
    title: "Sample Title", // Default title
    image: "/images/sample.png", // Default image
    content: "Sample Content", // Default content
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc   Update a post
// @route  PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, image, content } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    // post.user = req.user._id;
    post.title = title;
    post.image = image;
    post.content = content;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc   Delete a post
// @route  DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted !" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export {
  getPosts,
  getPostById,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
};
