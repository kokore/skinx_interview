import { Router } from "express";

import {
  getPostsController,
  getPostController,
} from "../controller/postController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/posts", authenticateToken, getPostsController);
router.get("/post", authenticateToken, getPostController);

export default router;
