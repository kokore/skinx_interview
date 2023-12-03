import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with the actual type of your user object
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(".")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const publicKey = fs.readFileSync(
      path.resolve(__dirname, "../config/public_key.pem")
    );
    jwt.verify(token, publicKey, (err, decoded) => {
      req.user = decoded;
    });

    next();
  } catch (err) {
    res.status(400).send({ error: "auth failed" });
  }
};
