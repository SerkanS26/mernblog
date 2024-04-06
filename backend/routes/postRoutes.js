import express from "express";

const router = express.Router();

//post controllers
import { getPosts, getPostById } from "../controllers/postController.js";

//middleware for protected routes
//{protect, admin} from "../middleware/authMiddleware.js";

import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getPosts);
router.route("/:id").get(checkObjectId, getPostById);

export default router;
