import express from "express";
const router = express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// register user
router.route("/").post(registerUser);
// login user & get all users (admin)(protected route)
router.route("/auth").post(authUser);

// logout user (protected route)
router.post("/logout", protect, logoutUser);

// profile route (protected route)

export default router;
