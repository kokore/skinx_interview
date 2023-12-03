import { Request, Response, NextFunction } from "express";
import { createUserSerivce, userLoginService } from "../service/userService";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json(await createUserSerivce(req, res));
  } catch (err) {
    console.error(`Error`, err);
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json(await userLoginService(req, res));
  } catch (err) {
    console.error(`Error`, err);
    next(err);
  }
};
