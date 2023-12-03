import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  exp?: number;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const publicKey = fs.readFileSync(
      path.resolve(__dirname, "../config/jwtRS256.key.pub")
    );
    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      const code = decoded as JwtPayload;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      if (code?.exp && currentTimeInSeconds > code?.exp) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.user = decoded;
    });

    next();
  } catch (err) {
    res.status(400).send({ error: "auth failed" });
  }
};
