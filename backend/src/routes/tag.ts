import { Router } from "express";

import { getTagController } from "../controller/tagController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/tags", authenticateToken, getTagController);

export default router;
