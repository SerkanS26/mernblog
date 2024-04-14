import express from "express";
const router = express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// register user & get all users (admin)(protected route)
router.route("/").post(registerUser).get(protect, admin, getUsers);

// logout user (protected route)
router.post("/logout", protect, logoutUser);

// login user
router.post("/auth", authUser);

// profile route (protected route)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// get user by id, update user, delete user (admin)(protected route)
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById);

export default router;
