import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createUser, findUserByUsername, UserAccount } from "../models/user";

export const createUserSerivce = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body as UserAccount;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userExising = await findUserByUsername(username);

    if (userExising) {
      res.status(401).json({ error: "Username exising" });
    }

    const user = await createUser({ username, password: hashedPassword });

    if (user) {
      const privateKey = fs.readFileSync(
        path.resolve(__dirname, "../config/private_key.pem")
      );
      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userLoginService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body as UserAccount;

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid credentials" });
      }

      const privateKey = fs.readFileSync(
        path.resolve(__dirname, "../config/private_key.pem")
      );
      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "1h",
      });

      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
