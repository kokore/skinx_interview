import { Request, Response } from "express";

import { getPosts, getPost } from "../models/post";

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

export const getPostService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.query.id;

  try {
    const posts = await getPost(Number(id));
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
