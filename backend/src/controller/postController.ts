import { Request, Response, NextFunction } from "express";
import { getPostsService } from "../service/postService";

export const getPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json(await getPostsService(req, res));
  } catch (err) {
    console.error(`Error`, err);
    next(err);
  }
};
