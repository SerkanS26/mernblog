import express from "express";

const router = express.Router();

//post controllers
import {
  getPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  createPost,
} from "../controllers/postController.js";

//middleware for protected routes
import { protect, admin } from "../middleware/authMiddleware.js";

import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getPosts).post(protect, createPost);

router.get("/myposts", protect, getMyPosts);

router
  .route("/:id")
  .get(checkObjectId, getPostById)
  .put(protect, checkObjectId, updatePost)
  .delete(protect, checkObjectId, deletePost); // @access Private;

export default router;
