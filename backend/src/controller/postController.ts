import { Request, Response, NextFunction } from "express";
import { getPostsService, getPostService } from "../service/postService";

export const getPostsController = async (
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

export const getPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json(await getPostService(req, res));
  } catch (err) {
    console.error(`Error`, err);
    next(err);
  }
};
