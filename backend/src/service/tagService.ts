import { Request, Response } from "express";

import { getTags } from "../models/tag";

export const getTagsService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tags = await getTags();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
