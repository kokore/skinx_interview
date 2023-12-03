import { Request, Response } from "express";

import { getPosts } from "../models/post";

export const getPostsService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = req.query;

  try {
    const posts = await getPosts(query);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
