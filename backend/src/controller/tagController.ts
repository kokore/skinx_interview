import { Request, Response, NextFunction } from "express";
import { getTagsService } from "../service/tagService";

export const getTagController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json(await getTagsService(req, res));
  } catch (err) {
    console.error(`Error`, err);
    next(err);
  }
};
