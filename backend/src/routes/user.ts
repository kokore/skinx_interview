import { Router } from "express";

import {
  createUserController,
  loginController,
} from "../controller/userController";

const router = Router();

router.post("/signup", createUserController);
router.post("/login", loginController);

export default router;
