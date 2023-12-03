import { Router } from "express";

import { getPostController } from "../controller/postController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/posts", authenticateToken, getPostController);

export default router;
